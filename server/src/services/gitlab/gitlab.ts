import { fetchDataFromGitlabAsync } from "../../api/gitlab/gitlab";
import {
  gitlabUserDataQuery,
  gitlabUserExistenseQuery,
} from "../../api/gitlab/querries";
import { TimePeriod } from "../../types/core.types";
import {
  GQLResponse,
  GQLUserNode,
  GQLUserVerificationResponse,
} from "../../types/gitlab.types";
import { getNPeriodBeforeDate } from "../../utlis/time";

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
  username: string,
  period: TimePeriod = "month"
): Promise<GQLUserNode> {
  const date = getNPeriodBeforeDate(period);
  const query = gitlabUserDataQuery(username, date);
  let response = await fetchDataFromGitlabAsync(query);
  const data = (response as GQLResponse).user;
  return data;
}
