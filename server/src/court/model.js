import { Model } from 'objection';
import { ClubModel } from './club';

export class CourtModel extends Model {
  static tableName = 'courts';

  id;
  surface;
  price;
  clubId;

  club;

  static relationMappings = {
    club: {
      relation: Model.BelongsToOneRelation,
      modelClass: ClubModel,
      join: {
        from: 'courts.club_id',
        to: 'clubs.id',
      },
    },
  }
}
