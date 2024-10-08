import { AuthKeyGuard } from "@/guards"
import {
    AuthenticatorControllerService,
    GetFakeSignatureRequestBody,
} from "@/services"
import {
    RequestMessageResponse,
    VerifyMessageRequestBody,
    VerifyMessageResponse,
} from "@/services"
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    UseGuards,
} from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

@UseGuards(AuthKeyGuard)
@ApiTags("Authenticator")
@Controller("api/v1/authenticator")
export class AuthenticatorController {
    private readonly logger = new Logger(AuthenticatorController.name)
    constructor(
    private readonly authenticatorService: AuthenticatorControllerService,
    ) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: VerifyMessageResponse, status: 200 })
  @Post("verify-message")
    public async verifyMessage(@Body() body: VerifyMessageRequestBody) {
        return await this.authenticatorService.verifyMessage(body)
    }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: RequestMessageResponse, status: 200 })
  @Post("request-message")
  public async requestMessage() {
      return await this.authenticatorService.requestMessage()
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: VerifyMessageRequestBody, status: 200 })
  @Post("fake-signature")
  public async getFakeSignature(@Body() body: GetFakeSignatureRequestBody) {
      return await this.authenticatorService.getFakeSignature(body)
  }
}
