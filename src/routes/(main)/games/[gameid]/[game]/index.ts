const MadStatusNames = {
	accelerating: 'Accelerating',
	aggregating: 'Aggregating',
	allocating: 'Allocating',
	acquiring: 'Acquiring',
	automating: 'Automating',
	backtracing: 'Backtracing',
	bloxxing: 'Bloxxing',
	bootstrapping: 'Bootstrapping',
	calibrating: 'Calibrating',
	correlating: 'Correlating',
	denoobing: 'De-noobing',
	deionizing: 'De-ionizing',
	deriving: 'Deriving',
	energizing: 'Energizing',
	filtering: 'Filtering',
	generating: 'Generating',
	indexing: 'Indexing',
	loading: 'Loading',
	noobing: 'Noobing',
	optimizing: 'Optimizing',
	oxidizing: 'Oxidizing',
	queueing: 'Queueing',
	parsing: 'Parsing',
	processing: 'Processing',
	rasterizing: 'Rasterizing',
	reading: 'Reading',
	registering: 'Registering',
	rerouting: 'Re-routing',
	resolving: 'Resolving',
	sampling: 'Sampling',
	updating: 'Updating',
	writing: 'Writing',
	blox: 'Blox',
	countzero: 'Count Zero',
	cylon: 'Cylon',
	data: 'Data',
	ectoplasm: 'Ectoplasm',
	encryption: 'Encryption',
	event: 'Event',
	farnsworth: 'Farnsworth',
	bebop: 'Bebop',
	fluxcapacitor: 'Flux Capacitor',
	fusion: 'Fusion',
	game: 'Game',
	gibson: 'Gibson',
	host: 'Host',
	mainframe: 'Mainframe',
	metaverse: 'Metaverse',
	nerfherder: 'Nerf Herder',
	neutron: 'Neutron',
	noob: 'Noob',
	photon: 'Photon',
	profile: 'Profile',
	script: 'Script',
	skynet: 'Skynet',
	tardis: 'TARDIS',
	virtual: 'Virtual',
	analogs: 'Analogs',
	blocks: 'Blocks',
	cannon: 'Cannon',
	channels: 'Channels',
	core: 'Core',
	database: 'Database',
	dimensions: 'Dimensions',
	directives: 'Directives',
	engine: 'Engine',
	files: 'Files',
	gear: 'Gear',
	index: 'Index',
	layer: 'Layer',
	matrix: 'Matrix',
	paradox: 'Paradox',
	parameters: 'Parameters',
	parsecs: 'Parsecs',
	pipeline: 'Pipeline',
	players: 'Players',
	ports: 'Ports',
	protocols: 'Protocols',
	reactors: 'Reactors',
	sphere: 'Sphere',
	spooler: 'Spooler',
	stream: 'Stream',
	switches: 'Switches',
	table: 'Table',
	targets: 'Targets',
	throttle: 'Throttle',
	tokens: 'Tokens',
	torpedoes: 'Torpedoes',
	tubes: 'Tubes'
}

const participle = [
	MadStatusNames.accelerating,
	MadStatusNames.aggregating,
	MadStatusNames.allocating,
	MadStatusNames.acquiring,
	MadStatusNames.automating,
	MadStatusNames.backtracing,
	MadStatusNames.bloxxing,
	MadStatusNames.bootstrapping,
	MadStatusNames.calibrating,
	MadStatusNames.correlating,
	MadStatusNames.denoobing,
	MadStatusNames.deionizing,
	MadStatusNames.deriving,
	MadStatusNames.energizing,
	MadStatusNames.filtering,
	MadStatusNames.generating,
	MadStatusNames.indexing,
	MadStatusNames.loading,
	MadStatusNames.noobing,
	MadStatusNames.optimizing,
	MadStatusNames.oxidizing,
	MadStatusNames.queueing,
	MadStatusNames.parsing,
	MadStatusNames.processing,
	MadStatusNames.rasterizing,
	MadStatusNames.reading,
	MadStatusNames.registering,
	MadStatusNames.rerouting,
	MadStatusNames.resolving,
	MadStatusNames.sampling,
	MadStatusNames.updating,
	MadStatusNames.writing
]
const modifier = [
	MadStatusNames.blox,
	MadStatusNames.countzero,
	MadStatusNames.cylon,
	MadStatusNames.data,
	MadStatusNames.ectoplasm,
	MadStatusNames.encryption,
	MadStatusNames.event,
	MadStatusNames.farnsworth,
	MadStatusNames.bebop,
	MadStatusNames.fluxcapacitor,
	MadStatusNames.fusion,
	MadStatusNames.game,
	MadStatusNames.gibson,
	MadStatusNames.host,
	MadStatusNames.mainframe,
	MadStatusNames.metaverse,
	MadStatusNames.nerfherder,
	MadStatusNames.neutron,
	MadStatusNames.noob,
	MadStatusNames.photon,
	MadStatusNames.profile,
	MadStatusNames.script,
	MadStatusNames.skynet,
	MadStatusNames.tardis,
	MadStatusNames.virtual
]
const subject = [
	MadStatusNames.analogs,
	MadStatusNames.blocks,
	MadStatusNames.cannon,
	MadStatusNames.channels,
	MadStatusNames.core,
	MadStatusNames.database,
	MadStatusNames.dimensions,
	MadStatusNames.directives,
	MadStatusNames.engine,
	MadStatusNames.files,
	MadStatusNames.gear,
	MadStatusNames.index,
	MadStatusNames.layer,
	MadStatusNames.matrix,
	MadStatusNames.paradox,
	MadStatusNames.parameters,
	MadStatusNames.parsecs,
	MadStatusNames.pipeline,
	MadStatusNames.players,
	MadStatusNames.ports,
	MadStatusNames.protocols,
	MadStatusNames.reactors,
	MadStatusNames.sphere,
	MadStatusNames.spooler,
	MadStatusNames.stream,
	MadStatusNames.switches,
	MadStatusNames.table,
	MadStatusNames.targets,
	MadStatusNames.throttle,
	MadStatusNames.tokens,
	MadStatusNames.torpedoes,
	MadStatusNames.tubes
]

export function newLib() {
	return (
		participle[Math.floor(Math.random() * participle.length)] +
		' ' +
		modifier[Math.floor(Math.random() * modifier.length)] +
		' ' +
		subject[Math.floor(Math.random() * subject.length)] +
		'...'
	)
}
