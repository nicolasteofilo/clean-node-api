import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
    return [{
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    },
    {
        question: 'any_question1',
        answers: [{
            image: 'any_image1',
            answer: 'any_answer1'
        }],
        date: new Date()
    }
    ]
}

const makeLoadSurveysStub = (): LoadSurveys => {
    class LoadSurveysStub implements LoadSurveys {
        async load(): Promise<SurveyModel[]> {
            return new Promise(resolve => resolve(makeFakeSurveys()))
        }
    }
    return new LoadSurveysStub()
}

interface SutTypes {
    sut: LoadSurveysController
    loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
    const loadSurveysStub = makeLoadSurveysStub()
    const sut = new LoadSurveysController(loadSurveysStub)
    return {
        sut,
        loadSurveysStub
    }
}

describe('LoadSurveys Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadSurveys', async () => {
        const { sut, loadSurveysStub } = makeSut()
        const loadSpy = jest.spyOn(loadSurveysStub, 'load')
        await sut.handle({})
        expect(loadSpy).toHaveBeenCalled()
    })
})
