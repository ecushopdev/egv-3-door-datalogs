import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDatalogDto {
  @ApiPropertyOptional({ type: String })
  race: string;
  @ApiProperty({ type: Number })
  soc: number;
  @ApiProperty({ type: Number })
  rangeToGo: number;
  @ApiProperty({ type: Number })
  speed: number;
  @ApiProperty({ type: Number })
  voltBatt: number;
  @ApiProperty({ type: Number })
  motor1RPM: number;
  @ApiProperty({ type: Number })
  motor1Volt: number;
  @ApiProperty({ type: Number })
  motor1Current: number;
  @ApiProperty({ type: Number })
  motor1Torque: number;
  @ApiProperty({ type: Number })
  motor2RPM: number;
  @ApiProperty({ type: Number })
  motor2Volt: number;
  @ApiProperty({ type: Number })
  motor2Current: number;
  @ApiProperty({ type: Number })
  motor2Torque: number;
  @ApiProperty({ type: Number })
  motor3RPM: number;
  @ApiProperty({ type: Number })
  motor3Volt: number;
  @ApiProperty({ type: Number })
  motor3Current: number;
  @ApiProperty({ type: Number })
  motor3Torque: number;
  @ApiProperty({ type: Number })
  acpMain: number;
  @ApiProperty({ type: Number })
  acpSub: number;
  @ApiProperty({ type: Number })
  ect1: number;
  @ApiProperty({ type: Number })
  ect2: number;
  @ApiProperty({ type: Number })
  stearing: number;
  @ApiProperty({ type: Number })
  breakPos: number;
  @ApiProperty({ type: Number })
  gearPos: number;
  @ApiProperty({ type: Number })
  aBatt: number;
  @ApiProperty({ type: Boolean })
  errorMotor1: boolean;
  @ApiProperty({ type: Boolean })
  errorMotor2: boolean;
  @ApiProperty({ type: Boolean })
  errorMotor3: boolean;
  @ApiProperty({ type: Date })
  timestamp: Date;
}
