// what if we don't need all the time we call http to have a loader ?
import { HttpContextToken } from "@angular/common/http";

export const SkipLoading = new HttpContextToken(
  () => false);
