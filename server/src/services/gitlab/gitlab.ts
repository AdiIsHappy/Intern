import { DateTime } from "luxon";
import { fetchDataFromGitlabAsync } from "../../api/gitlab/gitlab";
import {
  gitlabUserDataQuery,
  gitlabUserExistenseQuery,
} from "../../api/gitlab/querries";
import {
  GQLResponse,
  GQLUserNode,
  GQLUserVerificationResponse,
} from "../../types/gitlab.types";
const config = require("../../config.json");

const dataToFetchPeriodLengthInWeeks =
  config.analysis.fetchDataPeriodLengthinWeeks;

export async function checkIfUserExistsAsync(
  username: string
): Promise<string> {
  const query = gitlabUserExistenseQuery(username);
  let response = await fetchDataFromGitlabAsync(query);
  if ((response as GQLUserVerificationResponse).user === null) {
    return "";
  }
  return (response as GQLUserVerificationResponse).user.name;
}

export async function getGitlabUserDataAsync(
  username: string
): Promise<GQLUserNode> {
  const date = DateTime.now()
    .startOf("week")
    .minus({ week: dataToFetchPeriodLengthInWeeks })
    .toISO();
  const query = gitlabUserDataQuery(username, date);
  let response = await fetchDataFromGitlabAsync(query);
  const data = (response as GQLResponse).user;
  return data;
}
