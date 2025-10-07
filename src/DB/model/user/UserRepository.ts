import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";
import { IUser } from "../../../utlis/common/interface";
import { AbstractRepostory } from "../../abstract.repository";
import { User } from "./user.model";

export class UserRepository extends AbstractRepostory<IUser> {
    constructor() {
        super(User);
    }
    async getSpecificUser(filter: FilterQuery<IUser>, projection?: ProjectionType<IUser>, options?: QueryOptions<IUser>) {
        return await this.getOne(filter, projection, options);
    }
}