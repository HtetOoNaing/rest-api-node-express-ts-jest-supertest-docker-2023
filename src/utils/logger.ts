import pinoLogger from "pino";
import dayjs from "dayjs";

const logger = pinoLogger({
  base: {
    pid: false,
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;
