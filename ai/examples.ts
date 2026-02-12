import strokeRecoveryInput from "@/data/examples/stroke-recovery-input.json";
import strokeRecoveryOutput from "@/data/examples/stroke-recovery-output.json";

import activeUserInput from "@/data/examples/active-user-input.json";
import activeUserOutput from "@/data/examples/active-user-output.json";

export const EXERCISE_EXAMPLES = `
TRAINING EXAMPLES:
Below are examples demonstrating the expected quality, detail level, safety considerations, and format. Pay special attention to how medical conditions (stroke recovery, cardiac issues) are handled with extensive safety notes and gradual progressions:
---
EXAMPLE 1 - STROKE RECOVERY:

INPUT:
${JSON.stringify(strokeRecoveryInput, null, 2)}

OUTPUT:
${JSON.stringify(strokeRecoveryOutput, null, 2)}

---
EXAMPLE 2 -   ACTIVE USER FITNESS PLAN:

INPUT:
${JSON.stringify(activeUserInput, null, 2)}

OUTPUT:
${JSON.stringify(activeUserOutput, null, 2)}
`;
