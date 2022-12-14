export const VoxelHelper = {
    substanceMap: {
        solid: 1,
        flora: 2,
        transparent: 3,
        fluid: 4,
        magma: 5,
    },
    substanceRules: {
        "solid-solid": false,
        "solid-flora": true,
        "solid-transparent": true,
        "solid-fluid": true,
        "solid-magma": true,
        "flora-solid": true,
        "flora-flora": true,
        "flora-transparent": true,
        "flora-fluid": true,
        "flora-magma": true,
        "transparent-solid": true,
        "transparent-flora": true,
        "transparent-transparent": false,
        "transparent-fluid": true,
        "transparent-magma": true,
        "fluid-solid": false,
        "fluid-flora": true,
        "fluid-transparent": true,
        "fluid-fluid": false,
        "fluid-magma": true,
        "magma-solid": false,
        "magma-flora": true,
        "magma-transparent": true,
        "magma-fluid": true,
        "magma-magma": false,
    },
    ruleMap: {},
    $INIT() {
        for (const s1 of Object.keys(this.substanceMap)) {
            for (const s2 of Object.keys(this.substanceMap)) {
                const v1 = this.substanceMap[s1];
                const v2 = this.substanceMap[s2];
                const fv = v1 * 5 - 5 + v2;
                this.ruleMap[fv] = this.substanceRules[`${s1}-${s2}`];
            }
        }
    },
    substanceRuleCheck(voxel, neightborVoxel) {
        const v = this.substanceMap[voxel.substance] * 5 -
            5 +
            this.substanceMap[neightborVoxel.substance];
        /*   if (this.substanceRules[`${voxel.substance}-${neightborVoxel.substance}`]) {
           return true;
          } else {
           return false;
          } */
        return this.ruleMap[v];
    },
};
