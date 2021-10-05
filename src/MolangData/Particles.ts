import { Data } from './Data';

/** */
export namespace Particles {
	/** */
	export const Variables: Data[] = [
		{ documentation: "The total lifetime of the emitter in seconds", id: "emitter_lifetime" },
		{ documentation: "The age of the emitter in seconds", id: "emitter_age" },
		{ documentation: "A random value between 0 - 1 that gets sets at spawn of the emitter", id: "emitter_random_1" },
		{ documentation: "A random value between 0 - 1 that gets sets at spawn of the emitter", id: "emitter_random_2" },
		{ documentation: "A random value between 0 - 1 that gets sets at spawn of the emitter", id: "emitter_random_3" },
		{ documentation: "A random value between 0 - 1 that gets sets at spawn of the emitter", id: "emitter_random_4" },
		{ documentation: "The total lifetime of the particle in seconds", id: "particle_lifetime" },
		{ documentation: "The age of the particle in seconds", id: "particle_age" },
		{ documentation: "A random value between 0 - 1 that gets sets at spawn of the particle", id: "particle_random_1" },
		{ documentation: "A random value between 0 - 1 that gets sets at spawn of the particle", id: "particle_random_2" },
		{ documentation: "A random value between 0 - 1 that gets sets at spawn of the particle", id: "particle_random_3" },
		{ documentation: "A random value between 0 - 1 that gets sets at spawn of the particle", id: "particle_random_4" },
		{ documentation: "The scale of the entity that is using the particle", id: "entity_scale" },
	];
	/** */
	export const Contexts: Data[] = [];
	/** */
	export const Temps: Data[] = [];
}