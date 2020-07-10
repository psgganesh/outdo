import Cookies from 'js-cookie'
import { Bitbucket } from 'bitbucket'

const BASE_URL = 'https://api.bitbucket.org/2.0'

// state
export const state = {
  bitbucketClient: null,
  user: null,
  repositories: [],
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
        case 'new':
        case 'open':
          state.openIssues.push(issue)
          break
        case 'resolved':
        case 'closed':
          state.resolvedIssues.push(issue)
          break
        case 'invalid':
        case 'wont fix':
        case 'duplicate':
          state.deferredIssues.push(issue)
          break
        default:
          state.deferredIssues.push(issue)
      }
    })
  },
  RESET_REPOSITORY_LIST (state) {
    state.repositories = []
  },
  RESET_ISSUES_LIST (state) {
    state.issues = []
  },
  UPDATE_ISSUE (state, data) {
    let type = data.type
    state[type] = data.issue
  }
}

// actions
export const actions = {
  async setup ({ commit }) {
    const token = Cookies.get('token')
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
    await state.bitbucketClient.repositories.listIssues({
      repo_slug: request.slug,
      workspace: request.workspace,
      pagelen: 100
    }).then(({ data }) => commit('SET_ISSUES', data.values))
      .catch((err) => console.error(err))
  },

  async updateIssue ({ commit }, data) {

    // await state.bitbucketClient.repositories.listIssues({
    //   repo_slug: request.slug,
    //   workspace: request.workspace,
    //   pagelen: 100
    // }).then(({ data }) => commit('SET_ISSUES', data.values))
    //   .catch((err) => console.error(err))

    // commit('UPDATE_ISSUE', data);
  }
}
