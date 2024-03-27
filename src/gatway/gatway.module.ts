import { Module } from '@nestjs/common';
import { Mygatway } from './gatway';
import { RoomsModule } from 'src/rooms/rooms.module';
import { MessageModule } from 'src/message/message.module';

@Module({
    imports:[RoomsModule , MessageModule],
    providers:[Mygatway],
    controllers:[],

})
export class GatwayModule {}
