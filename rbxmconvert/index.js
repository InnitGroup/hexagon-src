// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

/* auto-generated by NAPI-RS */
import { createRequire } from 'node:module';
import { constants, access, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { platform, arch } from 'node:process'

const require = createRequire(import.meta.url)

let nativeBinding = null
let loadError = null

const doesPathNotExist = async (path) => {
	try {
		await access(path, constants.R_OK)
		return false
	} catch (e) {
		return true
	}
}

async function isMusl() {
	// For Node 10
	if (!process.report || typeof process.report.getReport !== 'function') {
		try {
			const lddPath = require('node:child_process')
				.then((m) => m.exec('which ldd'))
				.toString()
				.trim()
			const data = await readFile(lddPath, 'utf8').includes('musl')
			return data
		} catch (e) {
			return true
		}
	} else {
		const { glibcVersionRuntime } = process.report.getReport().header
		return !glibcVersionRuntime
	}
}

const __dirname = new URL('.', import.meta.url).pathname

switch (platform) {
	case 'android':
		switch (arch) {
			case 'arm64':
				const existsArm64 = await doesPathNotExist(
					join(__dirname, 'rbxmconvert.android-arm64.node')
				)
				try {
					if (existsArm64) {
						nativeBinding = require('./rbxmconvert.android-arm64.node')
					} else {
						nativeBinding = require('rbxmconvert-android-arm64')
					}
				} catch (e) {
					loadError = e
				}
				break
			case 'arm':
				const existsArmEabi = await doesPathNotExist(
					join(__dirname, 'rbxmconvert.android-arm-eabi.node')
				)
				try {
					if (existsArmEabi) {
						nativeBinding = require('./rbxmconvert.android-arm-eabi.node')
					} else {
						nativeBinding = require('rbxmconvert-android-arm-eabi')
					}
				} catch (e) {
					loadError = e
				}
				break
			default:
				throw new Error(`Unsupported architecture on Android ${arch}`)
		}
		break
	case 'win32':
		switch (arch) {
			case 'x64':
				const existsX64 = await doesPathNotExist(join(__dirname, 'rbxmconvert.win32-x64-msvc.node'))

				console.log(__dirname + 'rbxmconvert.win32-x64-msvc.node')
				try {
					if (existsX64) {
						nativeBinding = require('./rbxmconvert.win32-x64-msvc.node')
					} else {
						nativeBinding = require('rbxmconvert-win32-x64-msvc')
					}
				} catch (e) {
					loadError = e
				}
				break
			case 'ia32':
				const existsIa32 = await doesPathNotExist(
					join(__dirname, 'rbxmconvert.win32-ia32-msvc.node')
				)
				try {
					if (existsIa32) {
						nativeBinding = require('./rbxmconvert.win32-ia32-msvc.node')
					} else {
						nativeBinding = require('rbxmconvert-win32-ia32-msvc')
					}
				} catch (e) {
					loadError = e
				}
				break
			case 'arm64':
				const existsArm64Win = await doesPathNotExist(
					join(__dirname, 'rbxmconvert.win32-arm64-msvc.node')
				)
				try {
					if (existsArm64Win) {
						nativeBinding = require('./rbxmconvert.win32-arm64-msvc.node')
					} else {
						nativeBinding = require('rbxmconvert-win32-arm64-msvc')
					}
				} catch (e) {
					loadError = e
				}
				break
			default:
				throw new Error(`Unsupported architecture on Windows: ${arch}`)
		}
		break
	case 'darwin':
		const existsUniversal = await doesPathNotExist(
			join(__dirname, 'rbxmconvert.darwin-universal.node')
		)
		try {
			if (existsUniversal) {
				nativeBinding = require('./rbxmconvert.darwin-universal.node')
			} else {
				nativeBinding = require('rbxmconvert-darwin-universal')
			}
		} catch {}
		switch (arch) {
			case 'x64':
				const existsX64Darwin = await doesPathNotExist(
					join(__dirname, 'rbxmconvert.darwin-x64.node')
				)
				try {
					if (existsX64Darwin) {
						nativeBinding = require('./rbxmconvert.darwin-x64.node')
					} else {
						nativeBinding = require('rbxmconvert-darwin-x64')
					}
				} catch (e) {
					loadError = e
				}
				break
			case 'arm64':
				const existsArm64Darwin = await doesPathNotExist(
					join(__dirname, 'rbxmconvert.darwin-arm64.node')
				)
				try {
					if (existsArm64Darwin) {
						nativeBinding = require('./rbxmconvert.darwin-arm64.node')
					} else {
						nativeBinding = require('rbxmconvert-darwin-arm64')
					}
				} catch (e) {
					loadError = e
				}
				break
			default:
				throw new Error(`Unsupported architecture on macOS: ${arch}`)
		}
		break
	case 'freebsd':
		if (arch !== 'x64') {
			throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
		}
		const existsFreebsd = await doesPathNotExist(join(__dirname, 'rbxmconvert.freebsd-x64.node'))
		try {
			if (existsFreebsd) {
				nativeBinding = require('./rbxmconvert.freebsd-x64.node')
			} else {
				nativeBinding = require('rbxmconvert-freebsd-x64')
			}
		} catch (e) {
			loadError = e
		}
		break
	case 'linux':
		switch (arch) {
			case 'x64':
				if (await isMusl()) {
					const existsX64Musl = await doesPathNotExist(
						join(__dirname, 'rbxmconvert.linux-x64-musl.node')
					)
					try {
						nativeBinding = require('./rbxmconvert.linux-x64-musl.node') // hack but idgaf
					} catch (e) {
						loadError = e
					}
				} else {
					const existsX64Gnu = await doesPathNotExist(
						join(__dirname, 'rbxmconvert.linux-x64-gnu.node')
					)
					try {
						if (existsX64Gnu) {
							nativeBinding = require('./rbxmconvert.linux-x64-gnu.node')
						} else {
							nativeBinding = require('rbxmconvert-linux-x64-gnu')
						}
					} catch (e) {
						loadError = e
					}
				}
				break
			case 'arm64':
				if (await isMusl()) {
					const existsArm64Musl = await doesPathNotExist(
						join(__dirname, 'rbxmconvert.linux-arm64-musl.node')
					)
					try {
						if (existsArm64Musl) {
							nativeBinding = require('./rbxmconvert.linux-arm64-musl.node')
						} else {
							nativeBinding = require('rbxmconvert-linux-arm64-musl')
						}
					} catch (e) {
						loadError = e
					}
				} else {
					const existsArm64Gnu = await doesPathNotExist(
						join(__dirname, 'rbxmconvert.linux-arm64-gnu.node')
					)
					try {
						if (existsArm64Gnu) {
							nativeBinding = require('./rbxmconvert.linux-arm64-gnu.node')
						} else {
							nativeBinding = require('rbxmconvert-linux-arm64-gnu')
						}
					} catch (e) {
						loadError = e
					}
				}
				break
			case 'arm':
				const existsArmGnueabihf = await doesPathNotExist(
					join(__dirname, 'rbxmconvert.linux-arm-gnueabihf.node')
				)
				try {
					if (existsArmGnueabihf) {
						nativeBinding = require('./rbxmconvert.linux-arm-gnueabihf.node')
					} else {
						nativeBinding = require('rbxmconvert-linux-arm-gnueabihf')
					}
				} catch (e) {
					loadError = e
				}
				break
			case 'riscv64':
				if (await isMusl()) {
					const existsRiscv64Musl = await doesPathNotExist(
						join(__dirname, 'rbxmconvert.linux-riscv64-musl.node')
					)
					try {
						if (existsRiscv64Musl) {
							nativeBinding = require('./rbxmconvert.linux-riscv64-musl.node')
						} else {
							nativeBinding = require('rbxmconvert-linux-riscv64-musl')
						}
					} catch (e) {
						loadError = e
					}
				} else {
					const existsRiscv64Gnu = await doesPathNotExist(
						join(__dirname, 'rbxmconvert.linux-riscv64-gnu.node')
					)
					try {
						if (existsRiscv64Gnu) {
							nativeBinding = require('./rbxmconvert.linux-riscv64-gnu.node')
						} else {
							nativeBinding = require('rbxmconvert-linux-riscv64-gnu')
						}
					} catch (e) {
						loadError = e
					}
				}
				break
			case 's390x':
				const existsS390xGnu = await doesPathNotExist(
					join(__dirname, 'rbxmconvert.linux-s390x-gnu.node')
				)
				try {
					if (existsS390xGnu) {
						nativeBinding = require('./rbxmconvert.linux-s390x-gnu.node')
					} else {
						nativeBinding = require('rbxmconvert-linux-s390x-gnu')
					}
				} catch (e) {
					loadError = e
				}
				break
			default:
				throw new Error(`Unsupported architecture on Linux: ${arch}`)
		}
		break
	default:
		throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
	if (loadError) {
		throw loadError
	}
	throw new Error(`Failed to load native binding`)
}

const { parse } = nativeBinding

export default parse
