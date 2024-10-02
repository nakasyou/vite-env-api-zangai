import {
  type EnvironmentOptions,
  type Plugin,
  DevEnvironment,
  type ResolvedConfig,
  createServerModuleRunner,
  RemoteEnvironmentTransport,
} from 'vite'
import { RemoteRunnerTransport } from 'vite/module-runner'

const ENV_NAME = 'VITE_PLUGIN_HONO_WITH_DENO'

const createDevEnvironment = (name: string, config: ResolvedConfig): DevEnvironment => {
  const transport = new RemoteEnvironmentTransport({
    send: (data) => {
      console.log('data', data)
    },
    onMessage: (listener) => {

    },
  })
  const env = new DevEnvironment(name, config, {
    hot: false,
    runner: {
      transport
    }
  })

  return env
}
const createEnvironmentOptions = (): EnvironmentOptions => {
  return {
    dev: {
      createEnvironment(name, config) {
        return createDevEnvironment(name, config)
      }
    }
  }
}
export const pluginHonoDeno = (): Plugin => {
  let config: ResolvedConfig
  return {
    name: 'vite-plugin-hono-with-deno',
    config() {
      return {
        environments: {
          [ENV_NAME]: createEnvironmentOptions()
        }
      }
    },
    configureServer(server) {
      server.middlewares.use(async (req, res) => {
        const runner = createServerModuleRunner(server.environments[ENV_NAME])
        console.log(await runner.import('./src/main.ts'))
        //console.log(server.environments.ssr.moduleGraph)
        res.end('Hello World')
      })
    }
  }
}
