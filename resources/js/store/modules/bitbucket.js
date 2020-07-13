import axios from 'axios'
import Cookies from 'js-cookie'
import { Bitbucket } from 'bitbucket'

const BASE_URL = 'https://api.bitbucket.org/2.0'
const WORKSPACES_URL = `${BASE_URL}/workspaces`

// state
export const state = {
  bitbucketClient: null,
  user: null,
  workspaces: [],
  repositories: [],
  currentRepository: null,
  files: [],
  issues: [],
  backlogIssues: [],
  openIssues: [],
  resolvedIssues: [],
  deferredIssues: []
}

// getters
export const getters = {
  client: state => state.bitbucketClient,
  currentRepository: state => state.currentRepository
}

// mutations
export const mutations = {
  SET_BITBUCKET_CLIENT (state, client) {
    state.bitbucketClient = client
  },
  SET_REPOSITORIES (state, repositories) {
    state.repositories = repositories
  },
  SET_WORKSPACES (state, workspaces) {
    state.workspaces = workspaces
  },
  SET_FILES (state, files) {
    state.files = files
  },
  SET_ISSUES (state, issues) {
    state.issues = issues
    state.issues.map((issue) => {
      switch (issue.state) {
        case 'on hold':
          state.backlogIssues.push(issue)
          break
        case 'open':
          state.openIssues.push(issue)
          break
        case 'resolved':
          state.resolvedIssues.push(issue)
          break
        case 'invalid':
          state.deferredIssues.push(issue)
          break
        default:
          state.openIssues.push(issue)
      }
    })
  },
  RESET_REPOSITORY_LIST (state) {
    state.repositories = []
  },
  RESET_ISSUES_LIST (state) {
    state.issues = []
    state.backlogIssues = []
    state.openIssues = []
    state.resolvedIssues = []
    state.deferredIssues = []
  },
  UPDATE_ISSUE (state, data) {
    let to = data.to
    let type = data.type
    data.issue.map((issue) => {
      issue.state = type
    })
    state[to] = data.issue
  },
  SET_ACTIVE_SPACE (state, space) {
    state.repositories.map((repository) => {
      if (repository.slug === space.repository) {
        state.currentRepository = repository
      }
    })
  }
}

// actions
export const actions = {
  async setup ({ commit }) {
    const token = Cookies.get('oauthToken')
    const clientOptions = {
      baseUrl: BASE_URL,
      request: {
        timeout: 10
      },
      auth: {
        token: token
      }
    }
    const client = new Bitbucket(clientOptions)
    commit('SET_BITBUCKET_CLIENT', client)
  },

  setActiveSpace ({ commit }, space) {
    commit('SET_ACTIVE_SPACE', space)
  },

  async workspaces ({ commit }, params) {
    const { oauthToken } = params
    const BearerToken = `Bearer ${oauthToken}`
    await axios.get(`${WORKSPACES_URL}`, {
      headers: { Authorization: BearerToken }
    }).then(({ data }) => {
      commit('SET_WORKSPACES', data.values)
      commit('COMMIT_LOADING_STATE', false, { root: true })
    }).catch((error) => console.log(error))
  },

  async repositories ({ state, commit }, params) {
    commit('RESET_REPOSITORY_LIST')
    await state.bitbucketClient.repositories.list({
      workspace: params.workspace,
      pagelen: 100
    }).then(({ data }) => {
      commit('SET_REPOSITORIES', data.values)
      commit('COMMIT_LOADING_STATE', false, { root: true })
    }).catch((err) => console.error(err))
  },

  async files ({ state, commit }, request) {
    await state.bitbucketClient.repositories.readSrcRoot({
      repo_slug: request.slug,
      workspace: request.workspace,
      pagelen: 100
    })
      .then(({ data }) => {
        commit('SET_FILES', data.values)
        commit('COMMIT_LOADING_STATE', false, { root: true })
      }).catch((err) => console.error(err))
  },

  async issues ({ state, commit }) {
    commit('RESET_ISSUES_LIST')
    await state.bitbucketClient.repositories.listIssues({
      repo_slug: state.currentRepository.uuid,
      workspace: state.currentRepository.workspace.uuid,
      pagelen: 100
    }).then(({ data }) => {
      commit('SET_ISSUES', data.values)
      commit('COMMIT_LOADING_STATE', false, { root: true })
    }).catch((err) => console.error(err))
  },

  async createIssue ({ commit }, formData) {
    let _body = {
      'state': formData.state,
      'title': formData.title,
      'content': formData.content
    }
    const requestBody = {
      '_body': _body,
      'repo_slug': state.currentRepository.slug,
      'workspace': state.currentRepository.workspace.slug
    }
    await state.bitbucketClient.issue_tracker.create(requestBody).then(({ data }) => {
      // commit('UPDATE_ISSUE_ARRAY', data.values)
      console.log(data)
    }).catch((err) => console.error(err))
  },

  async updateIssue ({ commit }, request) {
    let issue = request.issue
    let issueToBeUpdated = [...issue].pop()
    if (issue.length !== 0 && issueToBeUpdated.state !== request.type) {
      let issueId = issueToBeUpdated.id
      const requestBody = {
        '_body': {
          state: request.type
        },
        'issue_id': issueId,
        'repo_slug': state.currentRepository.slug,
        'workspace': state.currentRepository.workspace.slug
      }
      await state.bitbucketClient.issue_tracker.update(requestBody).catch((err) => console.error(err))
    }
    commit('UPDATE_ISSUE', request)
  }
}
