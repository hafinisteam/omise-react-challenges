import * as types from "./types";
import { defaultAction } from "../utils/createAction";

export const updateDonation = amount =>
  defaultAction(types.UPDATE_TOTAL_DONATE, { amount });

export const updateMessage = message =>
  defaultAction(types.UPDATE_MESSAGE, { message });
