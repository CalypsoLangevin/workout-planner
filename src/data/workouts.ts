export type ExerciseType = 'reps' | 'timed'

export interface ExerciseDefinition {
  id: string
  name: string
  type: ExerciseType
  sets: number
  reps?: number
  duration?: number
  startingWeight?: string
  defaultWeightKg?: number
  muscles: string
  description: string
  note: string
  tips: string[]
  cautions: string[]
  warmup?: boolean
}

export interface WorkoutDefinition {
  id: string
  title: string
  subtitle: string
  warmup: ExerciseDefinition[]
  main: ExerciseDefinition[]
}

export interface WorkoutTemplate {
  id: string
  name: string
  exerciseIds: string[]
}

// ─── Exercise bank ─────────────────────────────────────────────────────────────

export const exerciseBank: ExerciseDefinition[] = [

  // ── Warmup & Mobility ────────────────────────────────────────────────────────

  {
    id: 'wu-glute-bridge', name: 'Glute Bridge', type: 'reps', sets: 2, reps: 15,
    muscles: 'Glutes, lower back',
    description: 'Lie on your back, knees bent, feet flat. Push hips up, squeeze glutes at top, lower down.',
    note: 'Activates glutes & warms up the lumbar spine.',
    tips: ['Drive through your heels', 'Squeeze glutes hard at the top for 1 second'],
    cautions: ["Don't hyperextend your lower back at the top"],
    warmup: true,
  },
  {
    id: 'wu-cat-cow', name: 'Cat-Cow Stretch', type: 'reps', sets: 2, reps: 10,
    muscles: 'Spine, core',
    description: 'On hands and knees: arch back up like a cat, then drop belly and lift chin. Alternate slowly.',
    note: 'Spinal mobility — move slowly, breathe through each rep.',
    tips: ['Exhale as you round (cat), inhale as you arch (cow)', 'Feel each vertebra move'],
    cautions: ['Never force the range — move only as far as comfortable'],
    warmup: true,
  },
  {
    id: 'wu-hip-circle', name: 'Hip Circle', type: 'reps', sets: 1, reps: 10,
    muscles: 'Hips',
    description: 'Stand on one leg, draw large slow circles with the raised knee. Hold a wall for balance.',
    note: '10 reps per side.',
    tips: ['Make circles as large as mobility allows', 'Keep standing leg slightly bent'],
    cautions: ['Hold a wall to avoid falls'],
    warmup: true,
  },
  {
    id: 'wu-plank', name: 'Forearm Plank', type: 'timed', sets: 2, duration: 20,
    muscles: 'Core',
    description: 'Face down on forearms. Body straight from head to heels. Hold.',
    note: 'Core activation — wrist-safe.',
    tips: ['Elbows under shoulders', 'Squeeze glutes and quads throughout'],
    cautions: ['Stop if you feel sharp lower back pain'],
    warmup: true,
  },
  {
    id: 'wu-inchworm', name: 'Inchworm', type: 'reps', sets: 1, reps: 8,
    muscles: 'Hamstrings, shoulders, core',
    description: 'Stand, hinge forward and walk hands out to a plank. Pause, then walk feet to hands and stand.',
    note: 'Full-body warmup — takes about 4 seconds per rep.',
    tips: ['Keep legs as straight as possible when walking hands out', 'Hold the plank position briefly'],
    cautions: ["Don't rush — this is a controlled mobility drill"],
    warmup: true,
  },
  {
    id: 'wu-leg-swing', name: 'Leg Swing', type: 'reps', sets: 1, reps: 12,
    muscles: 'Hip flexors, glutes',
    description: 'Hold a wall, swing one leg forward and back in a pendulum motion. Then switch sides.',
    note: '12 reps per side — both front-back and side-to-side.',
    tips: ['Let momentum carry the leg — don\'t force it', 'Keep your torso upright'],
    cautions: ['Reduce range if hip clicks painfully'],
    warmup: true,
  },
  {
    id: 'wu-band-pull-apart', name: 'Band Pull-Apart', type: 'reps', sets: 2, reps: 15,
    muscles: 'Rear delts, upper back',
    description: 'Hold a resistance band in front of you at shoulder height, arms straight. Pull it apart until it touches your chest, then return.',
    note: 'Essential shoulder health warmup before any pressing.',
    tips: ['Keep arms straight throughout', 'Squeeze shoulder blades together at the end'],
    cautions: ['Use a light band — this is a warmup, not a strength exercise'],
    warmup: true,
  },
  {
    id: 'wu-world-greatest-stretch', name: 'World\'s Greatest Stretch', type: 'reps', sets: 1, reps: 6,
    muscles: 'Hip flexors, thoracic spine, hamstrings',
    description: 'From a lunge, place same-side hand on the floor inside your front foot. Rotate the other arm up toward the ceiling. Return and switch sides.',
    note: '6 reps per side — one of the best total-body mobility drills.',
    tips: ['Move slowly through each position', 'Reach the rotating arm as high as possible'],
    cautions: ['Stop if you feel pain in the hip or lower back'],
    warmup: true,
  },
  {
    id: 'wu-thoracic-rotation', name: 'Thoracic Rotation', type: 'reps', sets: 2, reps: 10,
    muscles: 'Thoracic spine, upper back',
    description: 'Lie on your side, knees stacked at 90°. Reach top arm forward then rotate it open to the other side, following with your eyes.',
    note: '10 reps per side. Unlocks upper back stiffness.',
    tips: ['Keep your knees together the whole time', 'Let your eyes follow your hand'],
    cautions: ['Move only as far as comfortable — don\'t force rotation'],
    warmup: true,
  },

  // ── Lower Body ───────────────────────────────────────────────────────────────

  {
    id: 'goblet-squat', name: 'Goblet Squat', type: 'reps', sets: 3, reps: 10,
    startingWeight: '5–8 kg', defaultWeightKg: 5, muscles: 'Quads, glutes',
    description: 'Hold a dumbbell vertically at your chest. Feet shoulder-width, toes out. Squat down between knees, then stand.',
    note: 'Great beginner squat — the weight counterbalances naturally.',
    tips: ['Keep chest tall', 'Push knees out over toes as you descend'],
    cautions: ["Don't let knees cave inward", "Stop depth when lower back rounds"],
  },
  {
    id: 'barbell-squat', name: 'Barbell Back Squat', type: 'reps', sets: 4, reps: 6,
    startingWeight: '20–40 kg', defaultWeightKg: 30, muscles: 'Quads, glutes, hamstrings',
    description: 'Bar rests on upper traps. Feet shoulder-width, toes slightly out. Squat until thighs are parallel, drive up through heels.',
    note: 'King of lower body exercises — prioritise form over weight.',
    tips: ['Brace your core like you\'re about to take a punch', 'Drive knees out throughout'],
    cautions: ["Never squat in a Smith machine for strength — use a free bar", "Knees caving is a red flag — reduce weight"],
  },
  {
    id: 'front-squat', name: 'Front Squat', type: 'reps', sets: 3, reps: 8,
    startingWeight: '15–30 kg', defaultWeightKg: 20, muscles: 'Quads, core',
    description: 'Bar rests on front delts, elbows high. Squat deep while keeping torso upright.',
    note: 'More quad-dominant than back squat. Requires good ankle mobility.',
    tips: ['Elbows must stay high — they drop, the bar falls', 'Torso stays more vertical than back squat'],
    cautions: ['Wrist flexibility is often the limiting factor — use straps if needed'],
  },
  {
    id: 'rdl', name: 'Romanian Deadlift', type: 'reps', sets: 3, reps: 10,
    startingWeight: '8–10 kg each hand', defaultWeightKg: 8, muscles: 'Hamstrings, glutes, lower back',
    description: 'Hold dumbbells in front of thighs. Push hips back, lowering weights along legs until hamstring stretch. Drive hips forward to stand.',
    note: 'Hinge, not a squat — knees stay slightly bent.',
    tips: ['Think "push hips to the wall behind you"', 'Keep the weights dragging along your legs'],
    cautions: ["Never round your lower back — lighten the weight if it does"],
  },
  {
    id: 'conventional-deadlift', name: 'Conventional Deadlift', type: 'reps', sets: 3, reps: 5,
    startingWeight: '40–60 kg', defaultWeightKg: 50, muscles: 'Hamstrings, glutes, lower back, traps',
    description: 'Bar over mid-foot, hip-width stance. Hinge to grip bar, chest up, push floor away. Lock out at top, hinge back down.',
    note: 'Pull of the century — the most total-body barbell exercise.',
    tips: ['Push the floor away, don\'t think "pull the bar up"', 'Engage lats by trying to bend the bar around your legs'],
    cautions: ["Don't jerk the bar off the floor — build tension before it moves", "Lower back rounding = stop, reduce weight"],
  },
  {
    id: 'sumo-deadlift', name: 'Sumo Deadlift', type: 'reps', sets: 3, reps: 5,
    startingWeight: '40–60 kg', defaultWeightKg: 50, muscles: 'Glutes, inner thighs, hamstrings',
    description: 'Wide stance, toes pointed out 45°. Grip bar inside your legs. Chest up, push knees out, drive hips to the bar.',
    note: 'Shorter range of motion than conventional — easier on the lower back.',
    tips: ['Push knees out hard — don\'t let them collapse inward', 'Hips closer to the bar than conventional'],
    cautions: ['Requires good hip mobility — don\'t force the wide stance'],
  },
  {
    id: 'hip-thrust', name: 'Hip Thrust', type: 'reps', sets: 3, reps: 15,
    startingWeight: 'Bodyweight → barbell', muscles: 'Glutes, hips',
    description: 'Upper back on bench, feet flat, knees bent. Push hips up until body is straight from knees to shoulders. Squeeze glutes hard at top.',
    note: 'Best glute isolation exercise available.',
    tips: ['Squeeze glutes as hard as possible at the top', 'Chin tucked — don\'t throw head back'],
    cautions: ['Start bodyweight only — master form before adding load', 'Bench edge should be on shoulder blades, not neck'],
  },
  {
    id: 'leg-press', name: 'Leg Press', type: 'reps', sets: 3, reps: 12,
    startingWeight: '20–40 kg', defaultWeightKg: 30, muscles: 'Quads, glutes',
    description: 'Feet flat on platform shoulder-width. Push platform until legs are nearly extended, lower under control.',
    note: 'Higher foot placement = more glutes. Lower = more quads.',
    tips: ['Push through the whole foot', 'Control the lowering phase (2–3 seconds)'],
    cautions: ['Never lock knees at full extension', 'Stop descent when lower back lifts off the pad'],
  },
  {
    id: 'hack-squat', name: 'Hack Squat', type: 'reps', sets: 3, reps: 10,
    startingWeight: '20–40 kg', defaultWeightKg: 25, muscles: 'Quads, glutes',
    description: 'On the hack squat machine, shoulders under pads, feet on platform. Squat until thighs are parallel, drive up.',
    note: 'Deep quad burn — more knee-dominant than leg press.',
    tips: ['Keep heels firmly planted', 'Control the descent'],
    cautions: ['Don\'t lock knees at the top', 'If knees hurt, elevate heels slightly'],
  },
  {
    id: 'walking-lunge', name: 'Walking Lunge', type: 'reps', sets: 3, reps: 12,
    startingWeight: 'Bodyweight → dumbbells', muscles: 'Quads, glutes, balance',
    description: 'Step forward into a lunge, back knee nearly touching the floor. Drive through the front heel to bring feet together, then lunge the other leg forward.',
    note: '12 reps per leg.',
    tips: ['Keep torso upright throughout', 'Front knee stays over ankle, not beyond the toes'],
    cautions: ["Don't let the front knee cave inward"],
  },
  {
    id: 'reverse-lunge', name: 'Reverse Lunge', type: 'reps', sets: 3, reps: 10,
    startingWeight: 'Bodyweight → dumbbells', muscles: 'Quads, glutes',
    description: 'Step backward into a lunge, back knee nearly touching floor. Drive through front heel to return.',
    note: '10 reps per leg. Easier on the knees than forward lunges.',
    tips: ['Keep front shin vertical', 'Drive through the front heel, not the back foot'],
    cautions: ['Keep front knee tracking over toes — don\'t let it collapse inward'],
  },
  {
    id: 'bulgarian-split-squat', name: 'Bulgarian Split Squat', type: 'reps', sets: 3, reps: 8,
    startingWeight: 'Bodyweight → dumbbells', muscles: 'Quads, glutes, hip flexors',
    description: 'Rear foot elevated on a bench. Front foot far enough forward that shin stays vertical at bottom. Lower back knee toward floor, drive back up.',
    note: '8 reps per leg. One of the hardest single-leg exercises.',
    tips: ['Front foot far enough forward that knee doesn\'t go past toes', 'Hold dumbbells at sides or goblet position'],
    cautions: ['Start bodyweight — this is much harder than it looks', 'Hip flexor of the rear leg will be stretched hard'],
  },
  {
    id: 'step-up', name: 'Step-Up', type: 'reps', sets: 3, reps: 10,
    startingWeight: 'Bodyweight → dumbbells', muscles: 'Quads, glutes',
    description: 'Step onto a bench or box with one foot. Drive through that heel to stand fully on top, then step back down.',
    note: '10 reps per leg.',
    tips: ['Drive through the heel of the stepping foot — don\'t push off the floor', 'Control the step down'],
    cautions: ['Use a stable box — never a chair with wheels'],
  },
  {
    id: 'leg-curl', name: 'Lying Leg Curl', type: 'reps', sets: 3, reps: 12,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Hamstrings',
    description: 'Lie face-down on the leg curl machine. Curl both heels toward your glutes, squeeze at the top, lower slowly.',
    note: 'Isolates the hamstrings — key for knee health.',
    tips: ['Squeeze at the top and hold 1 second', 'Lower slowly — 3 seconds down'],
    cautions: ['Don\'t let your hips lift off the pad to complete the rep — reduce weight'],
  },
  {
    id: 'leg-extension', name: 'Leg Extension', type: 'reps', sets: 3, reps: 15,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Quads',
    description: 'Sit in leg extension machine. Extend both legs until straight, hold briefly, lower under control.',
    note: 'Pure quad isolation.',
    tips: ['Control the lowering phase — don\'t let it snap down', 'Flex quads hard at full extension'],
    cautions: ['If you feel sharp pain in the knee, stop — this exercise can be contraindicated for some knee injuries'],
  },
  {
    id: 'sl-rdl', name: 'Single-Leg RDL', type: 'reps', sets: 3, reps: 10,
    startingWeight: '5–8 kg one hand', defaultWeightKg: 5, muscles: 'Hamstrings, glutes, balance',
    description: 'Stand on one leg, hold dumbbell in opposite hand. Hinge from hip, letting weight lower to floor while free leg lifts behind. Return to standing.',
    note: '10 reps per side.',
    tips: ['Hinge from your hip — don\'t just lean forward', 'Back leg and torso move like a seesaw'],
    cautions: ['The wobble is normal — if losing balance repeatedly, reduce weight'],
  },
  {
    id: 'clamshell', name: 'Banded Clamshell', type: 'reps', sets: 3, reps: 15,
    muscles: 'Hip abductors, glutes',
    description: 'Band above knees, lie on side, knees bent 45°. Keeping feet together, rotate top knee upward, then lower.',
    note: '15 reps per side.',
    tips: ['Keep hips stacked — don\'t let top hip roll back', 'Go slow on the lowering'],
    cautions: ["If top hip rolls back — reduce range or use a lighter band"],
  },
  {
    id: 'calf-raise', name: 'Calf Raise', type: 'reps', sets: 4, reps: 15,
    startingWeight: 'Bodyweight → added weight', muscles: 'Calves (gastrocnemius)',
    description: 'Stand on the edge of a step, heels hanging off. Rise up on toes as high as possible, then lower heels below the step level.',
    note: 'Full range is key — top to bottom.',
    tips: ['Pause at the top and squeeze', 'Lower all the way down to get a full stretch'],
    cautions: ['Don\'t bounce at the bottom — control the stretch'],
  },
  {
    id: 'seated-calf-raise', name: 'Seated Calf Raise', type: 'reps', sets: 4, reps: 15,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Calves (soleus)',
    description: 'Sit with knees at 90°, weight on thighs above knees. Rise up on toes, squeeze, lower under control.',
    note: 'Targets the soleus (inner calf) — different from standing raises.',
    tips: ['Full range of motion each rep', 'Slow and controlled — no bouncing'],
    cautions: ['Keep the pad positioned above the knee, not on it'],
  },
  {
    id: 'nordic-curl', name: 'Nordic Curl', type: 'reps', sets: 3, reps: 5,
    muscles: 'Hamstrings',
    description: 'Kneel with feet anchored under something heavy. Slowly lower your torso toward the floor by extending the knees, using hamstrings to resist. Catch yourself with hands, push back up.',
    note: 'Extremely demanding — 5 reps is hard. Best hamstring strengthening exercise.',
    tips: ['Brace your core the whole way down', 'Lower as slowly as you can control'],
    cautions: ['Don\'t attempt with tight hamstrings — risk of strain', 'Start with just 3–4 reps and build slowly'],
  },
  {
    id: 'glute-kickback', name: 'Glute Kickback', type: 'reps', sets: 3, reps: 15,
    muscles: 'Glutes',
    description: 'On all fours or standing at a cable machine. Kick one leg straight back and up, squeezing glute at the top. Lower under control.',
    note: '15 reps per side.',
    tips: ['Squeeze the glute hard at the top — hold 1 second', 'Keep your back flat — don\'t arch'],
    cautions: ['Movement should come from the hip, not the lower back'],
  },
  {
    id: 'good-morning', name: 'Good Morning', type: 'reps', sets: 3, reps: 10,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Hamstrings, lower back, glutes',
    description: 'Bar on upper back (or no weight). Feet hip-width, slight bend in knees. Hinge forward at the hips until torso is roughly parallel to floor, then stand.',
    note: 'Looks simple but humbles everyone — start very light.',
    tips: ['Push hips back, not down', 'Keep the spine neutral throughout'],
    cautions: ['Never round the lower back', 'Keep this light — the leverage is brutal on the spine'],
  },
  {
    id: 'box-jump', name: 'Box Jump', type: 'reps', sets: 3, reps: 8,
    muscles: 'Quads, glutes, calves, explosive power',
    description: 'Stand in front of a sturdy box. Swing arms, dip slightly, and explode up landing softly on the box with bent knees. Step down, don\'t jump down.',
    note: 'Power and explosiveness — do these fresh, not fatigued.',
    tips: ['Land softly with knees bent — absorb the impact', 'Step down rather than jumping down to protect joints'],
    cautions: ['Never attempt on an unstable surface', 'If shins are close to the box — increase distance'],
  },
  {
    id: 'wall-sit', name: 'Wall Sit', type: 'timed', sets: 3, duration: 45,
    muscles: 'Quads, glutes',
    description: 'Back flat against a wall, slide down until thighs are parallel to the floor. Hold.',
    note: 'Isometric quad burner — great for active recovery days.',
    tips: ['Thighs must be parallel to the floor for full effect', 'Breathe steadily throughout'],
    cautions: ['Don\'t go below parallel — that\'s unnecessary joint stress'],
  },

  // ── Upper Body Push ──────────────────────────────────────────────────────────

  {
    id: 'bench-press', name: 'Barbell Bench Press', type: 'reps', sets: 4, reps: 6,
    startingWeight: '20–40 kg', defaultWeightKg: 30, muscles: 'Chest, shoulders, triceps',
    description: 'Lie on bench, grip bar slightly wider than shoulder-width. Lower bar to lower chest, press back up.',
    note: 'Classic chest exercise — arch the lower back slightly, feet flat on floor.',
    tips: ['Tuck elbows at 45° — not flared out', 'Leg drive helps stability — press feet into the floor'],
    cautions: ['Always use a spotter or safety bars', 'Don\'t bounce the bar off your chest'],
  },
  {
    id: 'flat-db-press', name: 'Flat Dumbbell Press', type: 'reps', sets: 3, reps: 10,
    startingWeight: '8–12 kg each', defaultWeightKg: 10, muscles: 'Chest, shoulders, triceps',
    description: 'Lie flat on bench, dumbbells at chest level, elbows at 45°. Press up and slightly together, lower back to chest.',
    note: 'Greater range of motion than barbell — better chest stretch.',
    tips: ['Press at a slight arc inward — not straight up', 'Controlled 2-second lowering'],
    cautions: ["Don't let dumbbells collide at the top — slight gap"],
  },
  {
    id: 'incline-db-press', name: 'Incline Dumbbell Press', type: 'reps', sets: 3, reps: 10,
    startingWeight: '6–10 kg each', defaultWeightKg: 8, muscles: 'Upper chest, shoulders',
    description: 'Bench at 45°. Press dumbbells from chest height overhead at a slight arc.',
    note: 'Targets upper chest — elbows at 45°, not flared.',
    tips: ['Keep shoulder blades retracted into the pad', 'Lower slowly for better chest engagement'],
    cautions: ['Flared elbows cause shoulder impingement over time'],
  },
  {
    id: 'push-up', name: 'Push-Up', type: 'reps', sets: 3, reps: 15,
    muscles: 'Chest, shoulders, triceps, core',
    description: 'Hands slightly wider than shoulder-width. Body straight from head to heels. Lower chest to floor, press back up.',
    note: 'The best bodyweight pushing exercise.',
    tips: ['Keep elbows at ~45° from torso — not flared out', 'Squeeze glutes and core — body stays rigid'],
    cautions: ["If form breaks down, drop to knees — don't do sloppy reps"],
  },
  {
    id: 'dip', name: 'Dip', type: 'reps', sets: 3, reps: 10,
    muscles: 'Chest (leaning forward) or Triceps (upright)',
    description: 'Support yourself on parallel bars. Lower until elbows at 90°, press back up. Lean forward for chest, stay upright for triceps.',
    note: 'One of the best upper body pushes — use assist machine if needed.',
    tips: ['Control the descent — don\'t drop', 'Don\'t go below 90° at the elbow'],
    cautions: ['Stop if shoulders feel unstable or painful — it\'s a demanding position'],
  },
  {
    id: 'shoulder-press', name: 'Dumbbell Shoulder Press', type: 'reps', sets: 3, reps: 10,
    startingWeight: '4–8 kg each', defaultWeightKg: 6, muscles: 'Shoulders, triceps',
    description: 'Sit with dumbbells at shoulder height, palms forward. Press overhead until arms extended, lower back.',
    note: 'Keep core tight — don\'t arch the lower back.',
    tips: ['Sit upright with back support', "Don't lock elbows at the top"],
    cautions: ['If shoulder clicks or pinches overhead — stop and consult a physio'],
  },
  {
    id: 'arnold-press', name: 'Arnold Press', type: 'reps', sets: 3, reps: 10,
    startingWeight: '4–8 kg each', defaultWeightKg: 6, muscles: 'All three deltoid heads',
    description: 'Start with dumbbells at chin height, palms facing you. As you press up, rotate palms forward. Reverse on the way down.',
    note: 'Hits all three delt heads in one movement.',
    tips: ['The rotation should be smooth and continuous', 'Don\'t rush the movement'],
    cautions: ['Lighter weight than regular shoulder press — more complex movement'],
  },
  {
    id: 'lateral-raise', name: 'Lateral Raise', type: 'reps', sets: 3, reps: 15,
    startingWeight: '2–4 kg each', defaultWeightKg: 3, muscles: 'Side delts',
    description: 'Stand with dumbbells at sides. Raise both arms out to shoulder height, lower slowly.',
    note: 'Very light weight — control is everything.',
    tips: ['Lead with elbows, not hands', 'Lower very slowly (3 seconds)'],
    cautions: ['Ego loading here causes shoulder impingement'],
  },
  {
    id: 'front-raise', name: 'Front Raise', type: 'reps', sets: 3, reps: 12,
    startingWeight: '3–6 kg each', defaultWeightKg: 4, muscles: 'Front delts',
    description: 'Hold dumbbells in front of thighs. Raise both arms forward to shoulder height, lower under control.',
    note: 'Keep a slight bend in the elbow throughout.',
    tips: ['Don\'t swing — strict form only', 'Control the lowering phase'],
    cautions: ['Stop at shoulder height — going higher strains the shoulder'],
  },
  {
    id: 'cable-chest-fly', name: 'Cable Chest Fly', type: 'reps', sets: 3, reps: 12,
    startingWeight: '5–10 kg each side', defaultWeightKg: 8, muscles: 'Chest',
    description: 'Stand between cables set to chest height. Arms slightly bent, bring handles together in front of chest in a hugging motion.',
    note: 'Best chest isolation — constant tension throughout the range.',
    tips: ['Keep the slight bend in elbows constant — don\'t turn it into a press', 'Feel the stretch at the start of each rep'],
    cautions: ['Don\'t let cables pull your arms too far back — it stresses the shoulder joint'],
  },
  {
    id: 'tricep-pushdown', name: 'Tricep Pushdown', type: 'reps', sets: 3, reps: 15,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Triceps',
    description: 'Stand at cable machine, overhand grip on bar. Elbows at sides, push bar down until arms fully extended. Slowly let it return.',
    note: 'Keep elbows glued to your sides throughout.',
    tips: ['Squeeze triceps hard at full extension', 'Upper arms should not move'],
    cautions: ['Don\'t lean forward to use body weight — strict form only'],
  },
  {
    id: 'overhead-tricep-extension', name: 'Overhead Tricep Extension', type: 'reps', sets: 3, reps: 12,
    startingWeight: '8–15 kg', defaultWeightKg: 10, muscles: 'Triceps (long head)',
    description: 'Hold one dumbbell overhead with both hands. Lower it behind your head by bending elbows, then extend back up.',
    note: 'Best tricep stretch — targets the long head.',
    tips: ['Keep elbows pointed straight up — they tend to flare out', 'Control the lowering fully'],
    cautions: ['Don\'t bang the dumbbell on the back of your neck'],
  },
  {
    id: 'skull-crusher', name: 'Skull Crusher', type: 'reps', sets: 3, reps: 12,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Triceps',
    description: 'Lie on a bench, barbell or dumbbells above chest, arms straight. Bend only at the elbows to lower weight toward forehead, extend back up.',
    note: 'Keep upper arms vertical — only the forearms move.',
    tips: ['Elbows stay pointing at the ceiling throughout', 'Controlled lowering — don\'t actually crush your skull'],
    cautions: ['Start light — this is precise and easy to go too heavy on'],
  },
  {
    id: 'close-grip-bench', name: 'Close-Grip Bench Press', type: 'reps', sets: 3, reps: 10,
    startingWeight: '20–35 kg', defaultWeightKg: 25, muscles: 'Triceps, chest',
    description: 'Bench press with shoulder-width grip. Lower bar to lower chest, press up with triceps doing most of the work.',
    note: 'More tricep-dominant than regular bench press.',
    tips: ['Elbows stay close to the body throughout', 'Not as narrow as you think — shoulder-width, not hand-touching'],
    cautions: ['Too narrow a grip strains the wrists — shoulder-width is enough'],
  },

  // ── Upper Body Pull ──────────────────────────────────────────────────────────

  {
    id: 'lat-pulldown', name: 'Lat Pulldown', type: 'reps', sets: 3, reps: 12,
    startingWeight: '15–25 kg', defaultWeightKg: 20, muscles: 'Lats, upper back',
    description: 'Grip the wide bar, wider than shoulders. Pull to chest, squeeze shoulder blades, let rise slowly.',
    note: 'Lean back slightly, pull elbows to back pockets.',
    tips: ['Initiate by pulling shoulder blades down first', 'Control the rise — don\'t snap up'],
    cautions: ['Never pull the bar behind your neck'],
  },
  {
    id: 'cable-row', name: 'Seated Cable Row', type: 'reps', sets: 3, reps: 12,
    startingWeight: '15–25 kg', defaultWeightKg: 20, muscles: 'Mid-back, biceps',
    description: 'Sit at cable row machine. Pull handle to belly button, chest upright, squeeze shoulder blades. Let it return under control.',
    note: 'Torso should barely move — it\'s about the back, not leaning.',
    tips: ['Sit tall throughout', 'Squeeze shoulder blades together at full contraction'],
    cautions: ["Don't lean back aggressively to finish — that's lower back cheating"],
  },
  {
    id: 'pullup', name: 'Pull-Up', type: 'reps', sets: 3, reps: 6,
    muscles: 'Lats, biceps, upper back',
    description: 'Overhand grip, slightly wider than shoulder-width. Pull until chin clears the bar. Lower fully.',
    note: 'Use assisted machine or band if needed. Best back exercise.',
    tips: ['Initiate by pulling shoulder blades down first', 'Lower slowly (3 seconds)'],
    cautions: ["Don't kip or swing to get up — use assist instead"],
  },
  {
    id: 'chin-up', name: 'Chin-Up', type: 'reps', sets: 3, reps: 6,
    muscles: 'Lats, biceps',
    description: 'Underhand grip, shoulder-width. Pull until chin clears the bar. Lower fully.',
    note: 'More bicep involvement than pull-up — generally easier for beginners.',
    tips: ['Full hang at the bottom for full range', 'Squeeze biceps and lats at the top'],
    cautions: ['Use band or machine assist if you can\'t do full reps'],
  },
  {
    id: 'barbell-row', name: 'Barbell Row', type: 'reps', sets: 3, reps: 8,
    startingWeight: '30–50 kg', defaultWeightKg: 40, muscles: 'Upper back, lats, biceps',
    description: 'Hinge to ~45°, overhand grip on barbell. Pull bar to lower chest/upper abs, squeeze, lower under control.',
    note: 'Back flat — don\'t round to jerk the weight up.',
    tips: ['Pull elbows back and up, not just the hands', 'Keep the hinge angle consistent throughout the set'],
    cautions: ["Don't round your lower back — reduce weight if you do"],
  },
  {
    id: 'db-row', name: 'Dumbbell Row', type: 'reps', sets: 3, reps: 10,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Lats, mid-back, biceps',
    description: 'One knee and hand on bench. Pull dumbbell from hanging to hip level, elbow driving back and up. Lower under control.',
    note: 'One side at a time — 10 reps each.',
    tips: ['Drive the elbow back, not just lift the hand', 'Keep your back parallel to the floor'],
    cautions: ['Don\'t rotate your torso to get the weight up — that\'s cheating'],
  },
  {
    id: 'chest-supported-row', name: 'Chest-Supported Row', type: 'reps', sets: 3, reps: 12,
    startingWeight: '8–15 kg each', defaultWeightKg: 12, muscles: 'Mid-back, rear delts',
    description: 'Lie chest-down on an incline bench (45°). Hang dumbbells, row them up squeezing shoulder blades.',
    note: 'Takes lower back out of the equation — pure upper back work.',
    tips: ['Squeeze shoulder blades together at the top', 'Keep chest on the pad throughout'],
    cautions: ['Don\'t use momentum — the chest support removes the option anyway'],
  },
  {
    id: 'face-pull', name: 'Face Pull', type: 'reps', sets: 3, reps: 15,
    startingWeight: '10–15 kg', defaultWeightKg: 12, muscles: 'Rear delts, rotator cuff, upper back',
    description: 'Cable set at head height with rope attachment. Pull rope to your face, separating the handles as you pull. External rotate at the end.',
    note: 'Essential for shoulder health — do it every session.',
    tips: ['Pull to your nose/forehead, not your chin', 'External rotate at the end — thumbs pointing back'],
    cautions: ['Keep weight light — this is a health exercise, not a strength one'],
  },
  {
    id: 'rear-delt-fly', name: 'Rear Delt Fly', type: 'reps', sets: 3, reps: 15,
    startingWeight: '3–6 kg each', defaultWeightKg: 4, muscles: 'Rear delts, upper back',
    description: 'Hinge forward to 45°, dumbbells hanging. Raise arms out to sides like wings, squeeze rear delts at top. Lower slowly.',
    note: 'Very light — most people go way too heavy here.',
    tips: ['Lead with elbows, keep slight bend in arms', 'Pause at the top and squeeze'],
    cautions: ['Ego weight makes this useless — use 3–5 kg and feel the muscle'],
  },
  {
    id: 'inverted-row', name: 'Inverted Row', type: 'reps', sets: 3, reps: 10,
    muscles: 'Upper back, biceps, core',
    description: 'Set a bar in a rack at hip height. Lie under it, grip overhand, body straight. Pull chest to bar, lower down.',
    note: 'Great bodyweight row — harder with body more horizontal.',
    tips: ['Body stays rigid like a plank throughout', 'Squeeze shoulder blades at the top'],
    cautions: ['Easier with knees bent — harder with legs straight. Progress gradually'],
  },
  {
    id: 'shrug', name: 'Barbell / Dumbbell Shrug', type: 'reps', sets: 3, reps: 15,
    startingWeight: '20–40 kg', defaultWeightKg: 30, muscles: 'Traps',
    description: 'Hold weight in front of thighs. Shrug shoulders straight up toward ears, hold 1 second, lower.',
    note: 'No rolling — straight up and down only.',
    tips: ['Go as high as possible at the top', 'Don\'t roll the shoulders — just up and down'],
    cautions: ['Rolling can cause impingement over time'],
  },
  {
    id: 'bicep-curl', name: 'Bicep Curl', type: 'reps', sets: 3, reps: 12,
    startingWeight: '6–12 kg each', defaultWeightKg: 8, muscles: 'Biceps',
    description: 'Hold dumbbells at sides, palms forward. Curl up to shoulder height, squeeze, lower slowly.',
    note: 'Elbows stay at sides — don\'t swing.',
    tips: ['Squeeze at the top and hold 1 second', 'Full extension at the bottom for full range'],
    cautions: ["Don't swing your body to get the weight up — reduce weight"],
  },
  {
    id: 'hammer-curl', name: 'Hammer Curl', type: 'reps', sets: 3, reps: 12,
    startingWeight: '6–12 kg each', defaultWeightKg: 8, muscles: 'Biceps, brachialis, forearms',
    description: 'Dumbbells at sides, neutral grip (thumbs up). Curl up keeping palms facing each other throughout.',
    note: 'Hits the brachialis — adds thickness to the arm.',
    tips: ['Elbows stay at sides', 'Controlled full range — top to bottom'],
    cautions: ["Don't swing — same rules as regular curl"],
  },
  {
    id: 'preacher-curl', name: 'Preacher Curl', type: 'reps', sets: 3, reps: 10,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Biceps (short head)',
    description: 'Upper arms resting on the angled preacher pad. Curl weight up, squeeze, lower fully to stretch.',
    note: 'Elbows locked in position — no cheating possible.',
    tips: ['Full extension at the bottom — this is where the stretch is', 'Squeeze hard at the top'],
    cautions: ["Don't drop the weight at the bottom — control all the way down"],
  },
  {
    id: 'cable-curl', name: 'Cable Curl', type: 'reps', sets: 3, reps: 15,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Biceps',
    description: 'Stand at low cable, underhand grip on bar or rope. Curl up, squeeze, lower slowly.',
    note: 'Constant tension throughout unlike dumbbells.',
    tips: ['Elbows stay at your sides', 'Lower slowly and under control'],
    cautions: ["Don't swing the torso — strict form"],
  },
  {
    id: 'upright-row', name: 'Upright Row', type: 'reps', sets: 3, reps: 12,
    startingWeight: '10–20 kg', defaultWeightKg: 15, muscles: 'Traps, side delts',
    description: 'Hold barbell or dumbbells in front of thighs. Pull up along the body until elbows reach chin level, lower under control.',
    note: 'Keep the grip fairly wide to reduce shoulder impingement risk.',
    tips: ['Lead with elbows — they go higher than the hands', 'Keep weight close to body throughout'],
    cautions: ['Narrow grip significantly increases impingement risk — use wide grip'],
  },

  // ── Core ─────────────────────────────────────────────────────────────────────

  {
    id: 'forearm-plank', name: 'Forearm Plank', type: 'timed', sets: 3, duration: 45,
    muscles: 'Core, shoulders',
    description: 'On forearms and toes, body straight. Hold.',
    note: 'Squeeze everything — glutes, quads, abs.',
    tips: ['Don\'t let hips sag or pike up', 'Breathe steadily throughout'],
    cautions: ['Stop if sharp lower back pain'],
  },
  {
    id: 'side-plank', name: 'Side Plank', type: 'timed', sets: 3, duration: 30,
    muscles: 'Obliques, glutes, core',
    description: 'Lie on side, forearm under shoulder. Raise hips until body forms a straight line. Hold.',
    note: '30 seconds per side.',
    tips: ['Stack feet or stagger for balance', 'Keep hips up — they tend to sag'],
    cautions: ['If shoulder hurts, drop to the knee on the bottom leg'],
  },
  {
    id: 'dead-bug', name: 'Dead Bug', type: 'reps', sets: 3, reps: 10,
    muscles: 'Deep core, lower back',
    description: 'Lie on back, arms up, knees at 90°. Lower opposite arm and leg toward floor without arching back. Return and switch.',
    note: '10 reps per side. Lower back stays glued to the floor.',
    tips: ['Press lower back into the floor — that\'s the whole exercise', 'Breathe out on the lowering phase'],
    cautions: ['If lower back lifts at all — reduce range of motion'],
  },
  {
    id: 'hollow-body-hold', name: 'Hollow Body Hold', type: 'timed', sets: 3, duration: 30,
    muscles: 'Core, hip flexors',
    description: 'Lie on back. Press lower back into floor. Raise legs and shoulders off the floor, arms extended overhead. Hold.',
    note: 'Foundation of gymnastics core strength.',
    tips: ['Lower back must stay pressed to the floor', 'Tuck arms alongside body if too hard with arms overhead'],
    cautions: ['Reduce hold time before compromising position'],
  },
  {
    id: 'leg-raise', name: 'Hanging Leg Raise', type: 'reps', sets: 3, reps: 10,
    muscles: 'Lower abs, hip flexors',
    description: 'Hang from a pull-up bar. Raise legs until parallel to floor (bent knees easier, straight legs harder). Lower under control.',
    note: 'Control the swing — no momentum.',
    tips: ['Exhale as you raise', 'Slower = harder = better'],
    cautions: ['Don\'t swing — if you are, your abs aren\'t working'],
  },
  {
    id: 'knee-raise', name: 'Lying Knee Raise', type: 'reps', sets: 3, reps: 15,
    muscles: 'Lower abs, hip flexors',
    description: 'Lie flat on back. Bring both knees to chest, then lower under control without letting feet touch the floor.',
    note: 'Easier than leg raise — good starter movement.',
    tips: ['Control the lowering — don\'t drop legs', 'Keep lower back pressed to the floor throughout'],
    cautions: ['If lower back arches, don\'t lower legs as far'],
  },
  {
    id: 'crunch', name: 'Crunch', type: 'reps', sets: 3, reps: 20,
    muscles: 'Upper abs',
    description: 'Lie on back, knees bent. Hands lightly behind head. Curl shoulders off floor, exhale at top, lower under control.',
    note: 'Curl — don\'t pull on your neck.',
    tips: ['Focus on the curl, not lifting high', 'Exhale as you crunch up'],
    cautions: ['Hands behind head — don\'t pull on the neck'],
  },
  {
    id: 'sit-up', name: 'Sit-Up', type: 'reps', sets: 3, reps: 15,
    muscles: 'Abs, hip flexors',
    description: 'Lie on back, knees bent, hands behind head or crossed on chest. Sit up fully, lower back down.',
    note: 'Full range — shoulder blades to upright position and back.',
    tips: ['Cross arms on chest to reduce neck strain', 'Control the descent'],
    cautions: ['Feet can be anchored for assistance'],
  },
  {
    id: 'russian-twist', name: 'Russian Twist', type: 'reps', sets: 3, reps: 20,
    startingWeight: 'Bodyweight → plate', muscles: 'Obliques',
    description: 'Sit at 45°, knees bent or raised. Hold a weight and rotate side to side, touching the floor beside you each time.',
    note: '20 total reps (10 per side).',
    tips: ['Keep chest up — don\'t hunch', 'Rotate from the torso, not just the arms'],
    cautions: ['Avoid if you have lower back issues — it loads the spine in rotation'],
  },
  {
    id: 'bicycle-crunch', name: 'Bicycle Crunch', type: 'reps', sets: 3, reps: 20,
    muscles: 'Obliques, abs',
    description: 'Lie on back, hands behind head. Alternate bringing elbow to opposite knee while extending the other leg.',
    note: 'Slow is better — this should be controlled, not a cardio drill.',
    tips: ['Rotate from your torso, not your neck', 'Extend the non-working leg low for more core engagement'],
    cautions: ['Don\'t pull on your neck — fingertips lightly support the head only'],
  },
  {
    id: 'pallof-press', name: 'Pallof Press', type: 'reps', sets: 3, reps: 12,
    startingWeight: '5–10 kg', defaultWeightKg: 8, muscles: 'Obliques, deep core, anti-rotation',
    description: 'Stand side-on to a cable machine. Hold handle at chest, press straight out and hold briefly, return to chest.',
    note: 'Anti-rotation — the core fights to keep you from twisting.',
    tips: ['Stand with feet shoulder-width for a stable base', 'Brace as if about to take a punch as you press out'],
    cautions: ['The weight on the cable should be challenging but allow full control'],
  },
  {
    id: 'ab-wheel', name: 'Ab Wheel Rollout', type: 'reps', sets: 3, reps: 8,
    muscles: 'Core, lats, shoulders',
    description: 'Kneel with ab wheel under shoulders. Roll out as far as possible while keeping hips down, roll back.',
    note: 'One of the hardest core exercises — start with small range.',
    tips: ['Keep hips down — don\'t let them sag or pike', 'Brace hard before each rep'],
    cautions: ['Start with small range until core is strong enough — full rollout is very advanced'],
  },
  {
    id: 'bird-dog', name: 'Bird Dog', type: 'reps', sets: 3, reps: 10,
    muscles: 'Deep core, glutes, lower back stability',
    description: 'On all fours. Extend opposite arm and leg simultaneously until both are parallel to floor. Hold 2 seconds, return.',
    note: '10 reps per side. Best lower back rehab exercise.',
    tips: ['Move slowly — speed defeats the purpose', 'Keep hips level — don\'t let them rotate'],
    cautions: ['If lower back hurts during this — see a physio'],
  },
  {
    id: 'mountain-climber', name: 'Mountain Climber', type: 'timed', sets: 3, duration: 30,
    muscles: 'Core, hip flexors, shoulders',
    description: 'In a push-up position. Alternately drive knees toward chest quickly.',
    note: '30 seconds of controlled movement — not sprinting.',
    tips: ['Keep hips level — don\'t pike up', 'Shoulders stay over wrists throughout'],
    cautions: ['Slow it down if hips start rising or form breaks'],
  },

  // ── Cardio & Conditioning ────────────────────────────────────────────────────

  {
    id: 'burpee', name: 'Burpee', type: 'reps', sets: 3, reps: 10,
    muscles: 'Full body, cardio',
    description: 'From standing: squat down, kick feet back to plank, do a push-up, jump feet forward, jump up with hands overhead.',
    note: 'The most hated exercise in fitness — for good reason.',
    tips: ['Pace yourself — 10 quality burpees beats 20 sloppy ones', 'Land softly from the jump'],
    cautions: ['Modify by stepping instead of jumping if you have joint issues'],
  },
  {
    id: 'jumping-jack', name: 'Jumping Jack', type: 'timed', sets: 3, duration: 30,
    muscles: 'Full body, cardio',
    description: 'Jump feet out while raising arms overhead, jump back together. Repeat.',
    note: 'Classic warmup or conditioning drill.',
    tips: ['Land softly on the balls of your feet', 'Keep a steady rhythm'],
    cautions: ['Low impact alternative: step side to side instead of jumping'],
  },
  {
    id: 'jump-rope', name: 'Jump Rope', type: 'timed', sets: 3, duration: 60,
    muscles: 'Calves, cardio, coordination',
    description: 'Jump rope continuously for the set duration.',
    note: 'Excellent cardio and coordination training.',
    tips: ['Land on the balls of your feet, knees slightly bent', 'Keep jumps small — just enough clearance'],
    cautions: ['If no rope available, simulate the motion — still very effective'],
  },
  {
    id: 'battle-rope', name: 'Battle Rope Waves', type: 'timed', sets: 4, duration: 30,
    muscles: 'Shoulders, arms, core, cardio',
    description: 'Hold one rope in each hand. Alternate raising and lowering arms rapidly to create waves in the rope.',
    note: 'Rest 30 seconds between sets.',
    tips: ['Keep knees bent and core braced throughout', 'Drive from the hips as well as the arms'],
    cautions: ['Anchor point must be secure — check before each set'],
  },
  {
    id: 'sled-push', name: 'Sled Push', type: 'timed', sets: 4, duration: 20,
    muscles: 'Quads, glutes, calves, full body',
    description: 'Load a sled, push it across the floor for the set duration or distance.',
    note: 'No eccentric = no soreness. Great conditioning without recovery cost.',
    tips: ['Stay low — drive from the legs, not the back', 'Maintain forward lean throughout'],
    cautions: ['Start with light load — sleds feel deceptively easy until they don\'t'],
  },
  {
    id: 'rowing-machine', name: 'Rowing Machine', type: 'timed', sets: 1, duration: 300,
    muscles: 'Full body, cardio',
    description: 'Set the damper to 4–6. Drive with legs first, then hinge back, then pull arms. Reverse on the way forward.',
    note: '5 minutes steady state, or use as intervals.',
    tips: ['60% legs, 20% back, 20% arms — legs do most of the work', 'Maintain a steady stroke rate ~22–26 spm'],
    cautions: ['Rounding the back under fatigue is the main injury risk — sit tall'],
  },
]

export const exerciseBankById: Record<string, ExerciseDefinition> =
  Object.fromEntries(exerciseBank.map(e => [e.id, e]))

const sharedWarmup = exerciseBank.filter(e => e.warmup)

// ─── Default templates ────────────────────────────────────────────────────────

export const defaultTemplates: WorkoutTemplate[] = [
  {
    id: 'A',
    name: 'Workout A',
    exerciseIds: ['goblet-squat', 'rdl', 'lat-pulldown', 'shoulder-press', 'cable-row', 'hip-thrust', 'forearm-plank'],
  },
]

export function templateToWorkoutDefinition(template: WorkoutTemplate): WorkoutDefinition {
  return {
    id: template.id,
    title: template.name,
    subtitle: '',
    warmup: sharedWarmup,
    main: template.exerciseIds.map(id => exerciseBankById[id]).filter(Boolean),
  }
}

export const workouts: Record<string, WorkoutDefinition> = {
  A: templateToWorkoutDefinition(defaultTemplates[0]),
}
