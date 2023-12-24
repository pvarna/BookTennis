import { Model } from 'objection';

export class UserModel extends Model {
  static tableName = 'users';

  id;
  email;
  password;
  fullName;
  phone;
  isAdmin;
}
