import Cookies from 'js-cookie'
import { Bitbucket } from 'bitbucket'

const BASE_URL = 'https://api.bitbucket.org/2.0'

// state
export const state = {
  bitbucketClient: null,
  user: null,
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
  client: state => state.bitbucketClient
}

// mutations
export const mutations = {
  SET_BITBUCKET_CLIENT (state, client) {
    state.bitbucketClient = client
  },
  SET_REPOSITORIES (state, repositories) {
    state.repositories = repositories
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
    let type = data.type
    state[type] = data.issue
  },
  SET_CURRENT_REPOSITORY (state, repositorySlug) {
    state.repositories.map((repository) => {
      if (repository.slug === repositorySlug) {
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

  async repositories ({ state, commit }, user) {
    let workspace = `{${user.uuid}}`
    await state.bitbucketClient.repositories.list({
      workspace: workspace,
      pagelen: 100
    })
      .then(({ data }) => commit('SET_REPOSITORIES', data.values))
      .catch((err) => console.error(err))
  },

  async files ({ state, commit }, request) {
    await state.bitbucketClient.repositories.readSrcRoot({
      repo_slug: request.slug,
      workspace: request.workspace,
      pagelen: 100
    })
      .then(({ data }) => commit('SET_FILES', data.values))
      .catch((err) => console.error(err))
  },

  async issues ({ state, commit }, request) {
    commit('RESET_ISSUES_LIST')
    commit('SET_CURRENT_REPOSITORY', request.slug)
    await state.bitbucketClient.repositories.listIssues({
      repo_slug: state.currentRepository.uuid,
      workspace: state.currentRepository.workspace.uuid,
      pagelen: 100
    }).then(({ data }) => commit('SET_ISSUES', data.values))
      .catch((err) => console.error(err))
  },

  async createIssue ({ commit }) {
    let _body = { 'title': 'new issue' }
    const requestBody = {
      '_body': _body,
      'repo_slug': state.currentRepository.slug,
      'workspace': state.currentRepository.workspace.slug
    }
    const { data, headers } = await state.bitbucketClient.issue_tracker.create(requestBody)
  },

  async updateIssue ({ commit }, request) {
    let _body = {
      state: 'invalid',
      'message': {
        'raw': 'This is now resolved.'
      }
    }
    let issueId = request.issue.id
    const requestBody = {
      '_body': _body,
      'issue_id': issueId,
      'repo_slug': state.currentRepository.slug,
      'workspace': state.currentRepository.workspace.slug
    }
    console.log(requestBody)
    await state.bitbucketClient.issue_tracker.update(requestBody).then(({ data, headers }) => {
      console.log(data)
    }).catch((err) => console.error(err))

    // commit('UPDATE_ISSUE', data);
  }
}
