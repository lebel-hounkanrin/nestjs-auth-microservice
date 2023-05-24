
import { IsNotEmpty } from 'class-validator';
//import { Transform, TransformFnParams } from 'class-transformer';


export class LoginUserDTO  {
  @IsNotEmpty({ message: 'Phone number should not be empty' })
  //@Transform((params: TransformFnParams) => params.value.trim())
  readonly phoneNumber: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  readonly password: string;
}