import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

    @ApiProperty({example:'Rafael'})
    name:string
    
    @ApiProperty({example:'rafael@email.com'})
    email:string
    
    @ApiProperty({example:'123456'})
    password:string
    
}

export class AddUserInfo{
    @ApiProperty({example:false})
    isEnabled: boolean
}