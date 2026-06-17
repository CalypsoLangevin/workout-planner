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
  id: 'A' | 'B'
  title: string
  subtitle: string
  warmup: ExerciseDefinition[]
  main: ExerciseDefinition[]
}

const sharedWarmup: ExerciseDefinition[] = [
  {
    id: 'wu-glute-bridge',
    name: 'Glute Bridge',
    type: 'reps',
    sets: 2,
    reps: 15,
    muscles: 'Glutes, lower back',
    description: 'Lie on your back, knees bent, feet flat on floor. Push hips straight up, squeeze glutes at top, then lower down.',
    note: 'Activates glutes & warms up the lumbar spine.',
    tips: [
      'Drive through your heels, not your toes',
      'Squeeze glutes hard at the top and hold 1 second',
      'Keep your chin tucked slightly to protect your neck',
    ],
    cautions: [
      'Don\'t hyperextend your lower back at the top — stop when hips are level',
      'Feet should be close enough that fingertips can graze your heels',
    ],
    warmup: true,
  },
  {
    id: 'wu-cat-cow',
    name: 'Cat-Cow Stretch',
    type: 'reps',
    sets: 2,
    reps: 10,
    muscles: 'Spine, core',
    description: 'On hands and knees: arch your back up like a cat (chin to chest), then drop belly toward floor and lift chin (cow). Alternate slowly.',
    note: 'Spinal mobility — move slowly, breathe through each rep.',
    tips: [
      'Move slowly — this is a mobility exercise, not cardio',
      'Exhale as you round (cat), inhale as you arch (cow)',
      'Feel each vertebra move one at a time',
    ],
    cautions: [
      'Never force the range — move only as far as comfortable',
      'Wrists should be under shoulders, knees under hips',
    ],
    warmup: true,
  },
  {
    id: 'wu-hip-circle',
    name: 'Hip Circle',
    type: 'reps',
    sets: 1,
    reps: 10,
    muscles: 'Hips',
    description: 'Stand on one leg, lift the other knee and draw large slow circles with it — forward and back. Hold a wall for balance.',
    note: '10 reps per side.',
    tips: [
      'Make the circles as large as your mobility allows',
      'Keep your standing leg slightly bent, not locked',
      'Engage your core to keep your torso still',
    ],
    cautions: [
      'Hold a wall — losing balance on one leg can cause a fall',
      'If your hip clicks painfully, reduce range and move slower',
    ],
    warmup: true,
  },
  {
    id: 'wu-plank',
    name: 'Forearm Plank',
    type: 'timed',
    sets: 2,
    duration: 20,
    muscles: 'Core',
    description: 'Face down, resting on forearms (not palms). Body forms a straight line from head to heels. Hold.',
    note: 'Core activation — wrist-safe. Rest briefly between sets.',
    tips: [
      'Elbows directly under shoulders',
      'Squeeze glutes and quads — your whole body should be engaged',
      'Breathe steadily, don\'t hold your breath',
    ],
    cautions: [
      'Stop if you feel sharp lower back pain — hips may be sagging',
      'Never hold your breath; it raises blood pressure sharply',
      'Forearms only — palm plank strains your wrists',
    ],
    warmup: true,
  },
]

export const workoutA: WorkoutDefinition = {
  id: 'A',
  title: 'Workout A',
  subtitle: 'Full Body · Strength Focus',
  warmup: sharedWarmup,
  main: [
    {
      id: 'a1-goblet-squat',
      name: 'Goblet Squat',
      type: 'reps',
      sets: 3,
      reps: 10,
      startingWeight: '5–8 kg',
      defaultWeightKg: 5,
      muscles: 'Quads, glutes, knees',
      description: 'Hold one dumbbell vertically against your chest with both hands. Feet shoulder-width, toes slightly out. Squat down between your knees, then stand back up.',
      note: 'Only go as deep as comfortable — stop if knees or lower back complain.',
      tips: [
        'Keep your chest tall — the dumbbell at chest height helps naturally',
        'Push your knees outward over your toes as you descend',
        'Drive through your whole foot to stand back up',
        'Breathe in on the way down, out on the way up',
      ],
      cautions: [
        'Don\'t let knees cave inward — this is the most common knee injury pattern',
        'Stop squat depth when lower back rounds — don\'t chase depth at the expense of form',
        'If knees ache, elevate your heels slightly on a plate or wedge',
      ],
    },
    {
      id: 'a2-rdl',
      name: 'Romanian Deadlift',
      type: 'reps',
      sets: 3,
      reps: 10,
      startingWeight: '8–10 kg each hand',
      defaultWeightKg: 8,
      muscles: 'Hamstrings, lower back, hips',
      description: 'Stand holding dumbbells in front of your thighs. Push hips back (not down), lowering weights along your legs until you feel a stretch in your hamstrings. Drive hips forward to stand.',
      note: 'Knees stay slightly bent — this is a hinge, not a squat.',
      tips: [
        'Think "push hips to the wall behind you" — not "bend forward"',
        'Keep the dumbbells dragging along your legs the whole way',
        'Feel the stretch in your hamstrings before reversing — that\'s the signal to come up',
        'Squeeze glutes to drive hips forward on the way up',
      ],
      cautions: [
        'Never round your lower back — this is the #1 cause of injury here. If it rounds, lighten the weight',
        'Keep a neutral spine from head to tailbone throughout',
        'Stop if you feel sharp pain in the lower back, not just the hamstring stretch',
      ],
    },
    {
      id: 'a3-lat-pulldown',
      name: 'Lat Pulldown',
      type: 'reps',
      sets: 3,
      reps: 12,
      startingWeight: '15–20 kg',
      defaultWeightKg: 15,
      muscles: 'Lats, upper back',
      description: 'Sit at the lat pulldown machine, grip the wide bar wider than shoulder-width. Pull the bar down to your chest, hold a second, then let it rise slowly back up.',
      note: 'Lean back slightly, squeeze shoulder blades together at the bottom.',
      tips: [
        'Initiate the pull by depressing your shoulder blades first — not just bending the arms',
        'Think "elbows to your back pockets" as you pull',
        'Control the rise back up — don\'t let it snap up',
        'A slight lean back (15–20°) is fine and helps the movement',
      ],
      cautions: [
        'Never pull the bar behind your neck — this compresses the cervical spine',
        'Don\'t use momentum or swing to get the weight down',
        'If your shoulders shrug up during the pull, the weight is too heavy',
      ],
    },
    {
      id: 'a4-shoulder-press',
      name: 'Dumbbell Shoulder Press',
      type: 'reps',
      sets: 3,
      reps: 10,
      startingWeight: '4–6 kg each hand',
      defaultWeightKg: 4,
      muscles: 'Shoulders, triceps',
      description: 'Sit on a bench, hold dumbbells at shoulder height with palms forward. Press both straight overhead until arms are extended, then lower back to start.',
      note: 'Keep core tight, don\'t arch lower back.',
      tips: [
        'Sit upright with back support if available — it keeps your spine safe',
        'Don\'t lock elbows at the top — keep a soft bend',
        'Lower slowly (2–3 seconds down) for better muscle development',
        'Keep wrists stacked over elbows throughout',
      ],
      cautions: [
        'Don\'t arch your lower back to get the weight up — that\'s your spine taking the load',
        'If your shoulder clicks or pinches overhead, stop and consult a physio',
        'Start lighter than you think — overhead pressing is demanding on joints',
      ],
    },
    {
      id: 'a5-cable-row',
      name: 'Seated Cable Row',
      type: 'reps',
      sets: 3,
      reps: 12,
      startingWeight: '15–20 kg',
      defaultWeightKg: 15,
      muscles: 'Mid-back, biceps',
      description: 'Sit at the cable row machine, feet on footrests, grip the handle. Pull it toward your belly button keeping your chest upright, then slowly let it return.',
      note: 'Don\'t round your back — imagine pulling your elbows into your back pockets.',
      tips: [
        'Sit tall — your torso should barely move during the pull',
        'Squeeze shoulder blades together at full contraction',
        'Pull elbows back, not just hands',
        'Fully extend arms on the way out to stretch the lats',
      ],
      cautions: [
        'Don\'t lean back aggressively to finish the pull — that\'s lower back, not back muscles',
        'Don\'t round forward at the return — controlled the whole range',
        'If you feel it in your lower back, you\'re leaning too much. Reduce weight',
      ],
    },
    {
      id: 'a6-hip-thrust',
      name: 'Hip Thrust',
      type: 'reps',
      sets: 3,
      reps: 15,
      startingWeight: 'Bodyweight → barbell month 2',
      muscles: 'Glutes, hips, lumbar',
      description: 'Sit on the floor with your upper back against a bench. Feet flat, knees bent. Push through your heels to lift hips until your body forms a straight line from knees to shoulders. Squeeze glutes hard at top, lower down.',
      note: 'Best exercise for hips & glutes — take your time learning the form.',
      tips: [
        'Your shoulder blades should rest on the bench edge, not your neck',
        'Chin tucked slightly — don\'t throw your head back',
        'Squeeze glutes as hard as you can at the top and hold 1 second',
        'Feet should be close enough that shins are vertical at the top',
      ],
      cautions: [
        'If your lower back arches at the top, tuck your pelvis slightly',
        'The bench edge should be below your shoulder blades — not on your neck',
        'Start with bodyweight only and master the form before adding load',
      ],
    },
    {
      id: 'a7-plank',
      name: 'Forearm Plank',
      type: 'timed',
      sets: 3,
      duration: 30,
      muscles: 'Core',
      description: 'Face down, resting on forearms (not palms). Body forms a straight line from head to heels. Hold without letting your hips sag or pike up.',
      note: 'Rest 60 sec between holds.',
      tips: [
        'Elbows under shoulders, hands loosely clasped or flat',
        'Squeeze glutes and quads — your whole body should work',
        'Look at the floor 30cm in front of you to keep neck neutral',
      ],
      cautions: [
        'Stop if you feel sharp lower back pain — hips are probably sagging',
        'Never hold your breath — breathe steadily throughout',
        'Forearms only — palm plank will hurt your wrists',
      ],
    },
  ],
}

export const workoutB: WorkoutDefinition = {
  id: 'B',
  title: 'Workout B',
  subtitle: 'Full Body · Conditioning Focus',
  warmup: sharedWarmup,
  main: [
    {
      id: 'b1-leg-press',
      name: 'Leg Press',
      type: 'reps',
      sets: 3,
      reps: 12,
      startingWeight: '20–30 kg',
      defaultWeightKg: 20,
      muscles: 'Quads, glutes, knees',
      description: 'Sit in the leg press machine, feet flat on the platform shoulder-width apart. Push the platform away until legs are almost fully extended, then bend knees to lower back down.',
      note: 'Don\'t lock knees at the top; stop descent before lower back lifts off seat.',
      tips: [
        'Feet shoulder-width, toes slightly out — same as a squat stance',
        'Push through the whole foot, not just the toes',
        'Control the lowering phase (2–3 seconds) for better results',
        'Higher foot placement = more glutes; lower = more quads',
      ],
      cautions: [
        'Never lock your knees at full extension — stop just short',
        'Stop descent when your lower back lifts off the pad — that\'s your limit for today',
        'Don\'t let knees cave inward on the press — push them out',
        'Start very light — machines can mislead you about how much you can handle',
      ],
    },
    {
      id: 'b2-sl-rdl',
      name: 'Single-Leg Romanian Deadlift',
      type: 'reps',
      sets: 3,
      reps: 10,
      startingWeight: '5–8 kg one hand',
      defaultWeightKg: 5,
      muscles: 'Hamstrings, glutes, balance',
      description: 'Stand on one leg, hold one dumbbell in the opposite hand. Hinge forward from your hip, letting the weight lower toward the floor while your free leg lifts behind you. Return to standing.',
      note: '10 reps per side. Touch a wall for balance — the wobble is normal.',
      tips: [
        'Hinge from your hip — don\'t just lean forward',
        'Keep your back leg and torso moving like one unit (like a seesaw)',
        'Soft bend in the standing knee — never locked',
        'Use a light weight and a wall until balance improves',
      ],
      cautions: [
        'The wobble is normal — but if you\'re losing balance repeatedly, lighten the weight',
        'Don\'t twist your spine — both hips should stay level as you hinge',
        'Stop if you feel sharp pain in the standing knee',
      ],
    },
    {
      id: 'b3-pullup',
      name: 'Assisted Pull-Up',
      type: 'reps',
      sets: 3,
      reps: 10,
      startingWeight: 'Set assist to ~70% bodyweight',
      muscles: 'Lats, biceps',
      description: 'Kneel or stand on the assisted pull-up machine, grip the bar overhead. Pull yourself up until chin clears the bar. Lower slowly. Use lat pulldown if no assisted pull-up machine.',
      note: 'Goal over time: reduce assistance until you can do unassisted pull-ups.',
      tips: [
        'Start the pull by squeezing shoulder blades together and down',
        'Drive elbows toward your hips — not just pull with hands',
        'Lower slowly (3 seconds) — the lowering builds most of the strength',
        'Full range: arms fully extended at bottom, chin over bar at top',
      ],
      cautions: [
        'Never drop suddenly from the top — controlled descent only',
        'If shoulders click or pinch, reduce range first — not a full hang',
        'Don\'t kip or swing to get up — momentum removes the benefit and stresses joints',
      ],
    },
    {
      id: 'b4-incline-press',
      name: 'Incline Dumbbell Press',
      type: 'reps',
      sets: 3,
      reps: 10,
      startingWeight: '6–8 kg each hand',
      defaultWeightKg: 6,
      muscles: 'Chest, shoulders',
      description: 'Set a bench to ~45° incline. Lie back, hold dumbbells at chest level with elbows at ~45° from your torso. Press up and slightly in, then lower back to chest.',
      note: 'Elbows NOT flared straight out — keep them angled to protect the shoulder joint.',
      tips: [
        'Elbows at 45° from your torso — not flared straight out to the sides',
        'Press slightly inward at the top (like a slight arc)',
        'Keep shoulder blades retracted and pressed into the pad throughout',
        'Lower slowly — 2–3 seconds — for better chest engagement',
      ],
      cautions: [
        'Flared elbows (90°) compress the shoulder joint — can cause impingement over time',
        'Don\'t bounce the dumbbells off your chest — controlled touch only',
        'If your shoulders feel unstable, reduce the weight and focus on the motion',
      ],
    },
    {
      id: 'b5-lateral-raise',
      name: 'Lateral Raise',
      type: 'reps',
      sets: 3,
      reps: 15,
      startingWeight: '2–4 kg each hand',
      defaultWeightKg: 2,
      muscles: 'Side delts',
      description: 'Stand holding light dumbbells at your sides. Raise both arms out to the side until they\'re at shoulder height (like a T shape), then lower slowly.',
      note: 'Very light weight — control is everything, momentum defeats the purpose.',
      tips: [
        'Lead with your elbows, not your hands — slight bend in the elbows',
        'Stop at shoulder height — going higher shifts load to traps',
        'Lower very slowly (3 seconds) — the lowering is where it actually works',
        'Tilt dumbbells slightly (little finger up) to better target the side delt',
      ],
      cautions: [
        'This is not a heavy exercise — ego loading here causes shoulder impingement',
        'Don\'t shrug your shoulders up as you raise — keep them down and back',
        'Stop if you feel a pinching pain at the top of your shoulder',
      ],
    },
    {
      id: 'b6-dead-bug',
      name: 'Dead Bug',
      type: 'reps',
      sets: 3,
      reps: 8,
      muscles: 'Deep core, lower back',
      description: 'Lie on your back, arms straight up toward ceiling, knees bent 90° in the air. Slowly lower your right arm overhead while extending your left leg toward the floor — without letting your lower back arch off the ground. Return and switch sides.',
      note: '8 reps per side. Breathe out on the lowering phase.',
      tips: [
        'Press your lower back firmly into the floor the entire time — that\'s the whole point',
        'Move slowly — 3–4 seconds per extension',
        'Breathe OUT as you lower the arm and leg — it helps stabilize the spine',
        'Alternate sides: right arm + left leg, then left arm + right leg',
      ],
      cautions: [
        'If your lower back lifts at all, reduce range of motion — don\'t lower as far',
        'This is harder than it looks done correctly — don\'t rush the reps',
        'Stop if you feel lower back pain (not just core fatigue)',
      ],
    },
    {
      id: 'b7-clamshell',
      name: 'Banded Clamshell',
      type: 'reps',
      sets: 3,
      reps: 15,
      muscles: 'Hip abductors, glutes',
      description: 'Place a resistance band just above your knees. Lie on your side, hips stacked, knees bent ~45°. Keeping feet together, rotate your top knee upward as far as you can (like a clamshell opening), then lower.',
      note: '15 reps per side. Targets your hip weakness directly — feel the burn on the outside of the hip.',
      tips: [
        'Keep your hips stacked vertically — don\'t let your top hip roll back',
        'Move only at the hip — your feet stay together and torso stays still',
        'Feel the burn on the side of your glute/hip — that\'s the target area',
        'Go slow on the lowering — don\'t let the band snap it down',
      ],
      cautions: [
        'If your top hip rolls back as you open — reduce range or use a lighter band',
        'Don\'t let your lower back do the rotation — it should be isolated to the hip',
        'The band should feel challenging by rep 12 — if easy, step up band resistance',
      ],
    },
  ],
}

export const workouts: Record<'A' | 'B', WorkoutDefinition> = { A: workoutA, B: workoutB }
