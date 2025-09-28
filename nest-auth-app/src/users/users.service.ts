import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppLogger } from 'src/common/logger/logger.service';
import { User, UserDocument } from 'src/users/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly logger: AppLogger,
  ) { }

  async findById(id: string): Promise<UserDocument | undefined> {
    try {

      this.logger.log("findById Service Started", UsersService.name);

      const user = await this.userModel.findById(id).select('-password').exec();

      if (!user) throw new NotFoundException('User not found');

      return user;

    } catch (error) {
      this.logger.error("Error retrieving user", error, UsersService.name);
      throw new InternalServerErrorException('Error retrieving user');
    }

  }

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    try {

      this.logger.log("findByEmail Service Started", UsersService.name);

      const user = await this.userModel.findOne({ email }).exec();

      return user ?? undefined;

    } catch (error) {

      this.logger.error("Error finding user by email", error, UsersService.name);
      throw new InternalServerErrorException('Error retrieving user');

    }
  }

  async create(userData: Partial<User>): Promise<UserDocument> {
    try {
      this.logger.log("create Service Started", UsersService.name);

      const user = new this.userModel(userData);

      return user.save();

    } catch (error) {

      this.logger.error("Error creating user", error, UsersService.name);
      throw new InternalServerErrorException('Error while saving user');
      
    }
  }
}
