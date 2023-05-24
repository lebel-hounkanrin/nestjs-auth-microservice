import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class RegisterUserDto {

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    //@Transform((params: TransformFnParams) =>
      //params.value ? params.value.trim() : null,
    //)
    confirmPassword: string;

}