import { AddSurveyModel } from '../../../useCases/add-survey/add-survey-protocols'

export interface AddSurveyRepository {
  add(surveyData: AddSurveyModel): Promise<void>
}
