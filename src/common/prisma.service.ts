import { PrismaClient, Prisma } from "@prisma/client";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import e from "express";

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
  ) {
    super({
      log: [
        {
          emit: "event",
          level: "info"
        },
        {
          emit: "event",
          level: "warn"
        },
        {
          emit: "event",
          level: "error"
        }
      ]
    });
  }

  onModuleInit(): any {
    this.$on("info", (e) => {
      this.logger.info(e);
    });

    this.$on("warn", () => {
      this.logger.warn(e);
    });

    this.$on("error", () => {
      this.logger.error(e);
    });

    this.$on("query", () => {
      this.logger.info(e);
    });
  }
}
