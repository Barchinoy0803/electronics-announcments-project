import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    return this.mailService.sendOtpToEmail(email)
  }

  @Post('activate')
  async activate(@Body('otp') otp: string) {
    return this.mailService.activate(otp)
  }
}
