import { client } from "../services/redis.services";
import { Logs } from "../models/log.model";
import { transporter } from "../services/mail.services";

export async function logModule(ipAddress: string) {
  try {
    const FAILED_THRESHOLD = 5;
    const TIME_WINDOW = 10 * 60; 
    const failedAttemptsKey = `ipTracker:${ipAddress}`;
    const logKey = `logs:${ipAddress}`;

    const failedCount = await client.incr(failedAttemptsKey);
    if (failedCount === 1) {
      await client.expire(failedAttemptsKey, TIME_WINDOW);
    }

    const timestamp = new Date().toISOString();
    if (failedCount === 1) {
      await client.hset(logKey, {
        reason: "Invalid access token or header",
        failedAttempts: 1,
        firstFailedTimestamp: timestamp,
      });
      await client.expire(logKey, TIME_WINDOW);
    } else {
      await client.hincrby(logKey, "failedAttempts", 1);
    }

    const logEntry = new Logs({
      ipAddress,
      timestamps: timestamp,
      reason: "Incorrect authorization token",
    });
    await logEntry.save();

    if (failedCount === FAILED_THRESHOLD) {
      console.log(`Threshold reached for ${ipAddress}`);

      const alertMessage = {
        from: "your-email@gmail.com",
        to: "admin@gmail.com",
        subject: "Alert: Multiple Failed Requests Detected",
        text: `IP Address ${ipAddress} has exceeded the failed request threshold with ${FAILED_THRESHOLD} failed attempts.`,
      };

      transporter.sendMail(alertMessage).catch((err) => {
        console.error("Error sending email:", err);
      });
    }
  } catch (error) {
    console.error("Error in logModule:", error);
  }
}
