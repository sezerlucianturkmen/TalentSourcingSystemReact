import RestApis from './RestApiUrls'

const candidateService = {
  getSourcedCandidates: RestApis.candidateService + '/candidate/findallsourced',
  getCandidates: RestApis.candidateService + '/candidate/findall',
  create: RestApis.candidateService + '/candidate/save',
  update: RestApis.candidateService + '/candidate/update',
  delete: RestApis.candidateService + '/candidate/delete/',
  findCandidate: RestApis.candidateService + '/candidate/findbyid/',
  findAllInteraction: RestApis.candidateService + '/interaction/findallbyid/',
  createInteraction: RestApis.candidateService + '/interaction/save',
  deleteAction: RestApis.candidateService + '/interaction/delete/',
  updateInteraction: RestApis.candidateService + '/interaction/update',
}

export default candidateService
