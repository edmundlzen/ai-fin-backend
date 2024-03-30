import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AdminDataService } from './admin-data.service';
import { AdminData } from './entities/admin-data.entity';
@Resolver(() => AdminData)
export class AdminDataResolver {
  constructor(private readonly AdminDataService: AdminDataService) {}

  @Query(() => AdminData, { name: 'adminData' })
  query() {
    return this.AdminDataService.query();
  }
}
