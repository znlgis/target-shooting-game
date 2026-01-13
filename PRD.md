# Planning Guide

An interactive shooting target game where players click on moving targets to score points, featuring multiple difficulty levels, combo system, power-up targets, sound effects, leaderboard tracking, and real-time score tracking.

**Experience Qualities**:
1. **Exciting** - Fast-paced action with immediate feedback, combos, and special targets creates an adrenaline-pumping experience
2. **Challenging** - Progressive difficulty levels and varying target types test player skill and reaction time
3. **Rewarding** - Clear scoring system with combo multipliers, power-ups, accuracy tracking, and leaderboard provide satisfying achievement feedback

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-view game with multiple interactive features including target spawning with different types, combo system, sound effects, scoring system, difficulty settings, leaderboard persistence, and game state management, making it a light application rather than a micro tool.

## Essential Features

### Target Shooting Mechanics
- **Functionality**: Targets appear randomly on screen and move; includes normal targets (orange), bonus targets (green with star), and speed targets (purple with lightning). All targets change position when hit before disappearing.
- **Purpose**: Core gameplay loop that tests player accuracy and reaction time with variety
- **Trigger**: Targets spawn automatically at intervals based on difficulty level
- **Progression**: Target appears → Moves across screen → Player clicks to hit → Target relocates briefly → Target disappears with visual feedback → Score updates with appropriate points
- **Success criteria**: Click detection works accurately, hit/miss is clearly communicated, targets spawn consistently, different target types behave correctly, all targets relocate on hit

### Combo System
- **Functionality**: Consecutive hits without missing build a combo multiplier that increases score per hit
- **Purpose**: Rewards consistent accuracy and creates excitement during streaks
- **Trigger**: Each successful hit increments combo counter
- **Progression**: Hit target → Combo increases → Multiplier applies to score → Miss or timeout resets combo → Max combo tracked
- **Success criteria**: Combo counter updates correctly, multiplier applies accurately, resets on miss, displays prominently during gameplay

### Bomb System
- **Functionality**: Players earn bombs by hitting 3 targets in a row and can use them via right-click to create an explosion at the cursor position that destroys all targets within radius
- **Purpose**: Provides strategic power-up for clearing multiple targets and rewards consistent accuracy
- **Trigger**: Earned after 3 consecutive hits; activated by right-clicking on the game area
- **Progression**: Earn bomb → Right-click at desired location → Explosion appears at cursor → All targets within radius destroyed → Points awarded per target destroyed
- **Success criteria**: Bombs earned correctly, right-click triggers explosion at cursor position, explosion radius works accurately, appropriate points awarded, visual feedback clear

### Power-Up Targets
- **Functionality**: Special targets that award bonus points - Bonus targets (300pts, green with star) and Speed targets (200pts, faster purple targets). All targets now relocate when hit before disappearing.
- **Purpose**: Add variety and higher-value opportunities for skilled players
- **Trigger**: Random spawn chance for each target (15% bonus, 10% speed)
- **Progression**: Special target spawns → Player identifies by color → Hit for bonus points → Target relocates briefly → Special feedback shown → Target disappears
- **Success criteria**: Special targets spawn at correct rates, award correct points, visually distinct, provide unique feedback, relocate on hit

### Sound Effects
- **Functionality**: Synthesized audio feedback using Web Audio API for hits, misses, bonuses, combos, and game over
- **Purpose**: Provides immediate audio reinforcement for actions and enhances game feel
- **Trigger**: Automatic on game events (hit, miss, bonus, combo, game end)
- **Progression**: Event occurs → Sound plays instantly → Complements visual feedback
- **Success criteria**: Sounds play without delay, appropriate tone for each event, no audio glitches

### Leaderboard System
- **Functionality**: Persistent storage of top 50 game scores with details (score, accuracy, hits, difficulty, date, max combo)
- **Purpose**: Provides long-term progression tracking and competitive element
- **Trigger**: Each completed game adds entry to leaderboard
- **Progression**: Game ends → Entry created with stats → Added to leaderboard → Sorted by score → Displayed in dialog
- **Success criteria**: Scores persist between sessions, sorted correctly, displays all relevant stats, accessible via button

### Scoring System
- **Functionality**: Tracks hits, misses, total shots, accuracy percentage, combo multiplier, and cumulative score with different point values
- **Purpose**: Provides achievement feedback and measures player performance
- **Trigger**: Updates automatically on each shot fired
- **Progression**: Player shoots → Hit/miss detected → Score increments/decrements with multipliers → Statistics update → Display refreshes
- **Success criteria**: Accurate counting, percentage calculations correct, score persists during session, combo multipliers apply correctly

### Difficulty Levels
- **Functionality**: Three difficulty modes (Easy, Medium, Hard) that adjust target speed, spawn rate, and size
- **Purpose**: Accommodates different skill levels and provides progression challenge
- **Trigger**: Player selects difficulty from menu before or during game
- **Progression**: Player selects difficulty → Settings apply → Target behavior adjusts → Game continues with new parameters
- **Success criteria**: Noticeable difference between difficulties, smooth transition when changed

### Game Timer
- **Functionality**: Countdown timer for game sessions with configurable duration
- **Purpose**: Creates urgency and defines clear game rounds
- **Trigger**: Starts when player begins game
- **Progression**: Timer starts → Counts down → Warning at low time → Reaches zero → Game ends → Shows final score
- **Success criteria**: Accurate timing, clear display, proper game end state

### Game State Management
- **Functionality**: Start, playing, paused, and game over states
- **Purpose**: Controls game flow and provides clear user control
- **Trigger**: Player actions (start, pause, restart buttons)
- **Progression**: Idle → Player clicks start → Game begins → Player can pause/resume → Timer ends → Game over screen → Restart option
- **Success criteria**: Clean state transitions, no gameplay during pause, scores reset appropriately

## Edge Case Handling
- **Rapid clicking**: Prevents score manipulation by tracking misses and resetting combos
- **Window resize**: Targets reposition gracefully, game pauses during significant layout changes
- **Target overlap**: Clicking registers only one hit, topmost target takes priority
- **Spam clicking empty space**: Counts as misses, resets combo, negatively affects accuracy
- **Timer completion during target hit**: Properly registers final shots before game over
- **Combo timeout**: Combo resets after 2 seconds of inactivity to maintain challenge
- **Audio context**: Lazy initialization of Web Audio API to comply with browser autoplay policies
- **Right-click outside game area**: Doesn't trigger bomb usage, only works within game boundaries
- **Multiple simultaneous bombs**: Prevented by checking bomb count before allowing usage
- **Target relocation boundary**: All targets relocate within valid game area boundaries when hit

## Design Direction
The design should evoke a sense of focused intensity with a modern shooting range aesthetic - clean, precise, and action-oriented with bold contrasts, sharp visual feedback, and engaging animations for combos and special targets.

## Color Selection
A high-contrast color scheme inspired by shooting ranges and targeting systems, emphasizing visibility and precision with additional colors for power-ups.

- **Primary Color**: Deep Navy Blue (oklch(0.25 0.05 250)) - Professional, focused atmosphere reminiscent of shooting ranges
- **Secondary Colors**: Electric Cyan (oklch(0.75 0.15 210)) for UI elements and active states; Dark Charcoal (oklch(0.18 0.01 260)) for backgrounds
- **Accent Color**: Vibrant Orange Red (oklch(0.65 0.22 35)) - High-visibility color for normal targets and critical actions
- **Power-up Colors**: 
  - Bonus Target Green (oklch(0.75 0.20 130)) - Attracts attention for high-value targets
  - Speed Target Purple (oklch(0.70 0.25 300)) - Distinct color for fast-moving challenges
- **Foreground/Background Pairings**: 
  - Primary Navy (oklch(0.25 0.05 250)): White text (oklch(0.98 0 0)) - Ratio 9.2:1 ✓
  - Background Dark (oklch(0.15 0.02 260)): Cyan text (oklch(0.75 0.15 210)) - Ratio 5.8:1 ✓
  - Accent Orange (oklch(0.65 0.22 35)): White text (oklch(0.98 0 0)) - Ratio 5.1:1 ✓
  - Card backgrounds (oklch(0.20 0.03 255)): Light gray text (oklch(0.85 0.02 260)) - Ratio 7.5:1 ✓
  - Bonus Green (oklch(0.75 0.20 130)): White text (oklch(0.95 0.01 130)) - Ratio 6.2:1 ✓
  - Speed Purple (oklch(0.70 0.25 300)): White text (oklch(0.95 0.01 300)) - Ratio 5.5:1 ✓

## Font Selection
Typography should communicate precision and modernity with strong readability for quick number recognition during fast gameplay.

- **Typographic Hierarchy**:
  - H1 (Game Title): Space Grotesk Bold/36px/tight tracking (-0.02em)
  - H2 (Score Display): JetBrains Mono Bold/48px/monospace for consistent digit width
  - Body (Instructions/Stats): Space Grotesk Medium/16px/relaxed leading (1.6)
  - Button Labels: Space Grotesk SemiBold/14px/wide tracking (0.05em)
  - Timer Display: JetBrains Mono Bold/32px/monospace for digit stability
  - Combo Display: JetBrains Mono Bold/24px/monospace for emphasis

## Animations
Animations emphasize the shooting action with snappy, responsive feedback for hits, smooth motion for targets, satisfying combo displays, and engaging power-up effects.

- Target movement: Smooth linear/eased motion depending on difficulty, bouncing off edges
- Target spawn: Scale from 0 to 1 (200ms) with slight bounce
- Power-up targets: Continuous subtle pulse animation (800ms loop) to draw attention
- Hit feedback: Quick scale + fade out (150ms) with particle burst effect
- Miss indicator: Combo reset, sound effect plays
- Score increment: Number pop animation (200ms spring) when points earned
- Combo display: Appears with scale animation, pulses continuously, fades out on reset
- Button interactions: Slight lift effect on hover (150ms ease-out)
- Game state transitions: Fade in/out overlays (300ms)
- Leaderboard entries: Stagger animation on open

## Component Selection
- **Components**: 
  - Card (for score display, game stats, and leaderboard entries with subtle shadow)
  - Button (for start/pause/restart/leaderboard with variant styles)
  - Badge (for difficulty indicator and game status)
  - Progress (for timer visualization as horizontal bar)
  - Separator (for dividing stats sections)
  - Dialog (for game over screen and leaderboard with final statistics)
  
- **Customizations**: 
  - Custom target component (circular SVG with crosshair design, color-coded by type)
  - Custom combo display (floating animated element with fire icon and multiplier)
  - Custom leaderboard dialog (sortable list with medals for top 3)
  - Custom game canvas area (full-screen playable zone with grid pattern background, supports right-click for bomb usage)
  - Animated hit effect component (expanding circles/particles on successful hit)
  - Custom timer display (large prominent numbers with warning states)
  - Custom bomb display (shows bomb count and right-click usage instructions)

- **States**: 
  - Buttons: Default, hover (lifted), active (pressed down), disabled (muted)
  - Targets: Default, hover (highlighted), hit (explosion animation), special types (pulsing)
  - Timer: Normal (cyan), warning <10s (yellow), critical <5s (red pulse)
  - Game status badge: Idle (muted), Active (cyan pulse), Paused (amber), Complete (green)
  - Combo display: Hidden, visible (pulsing), fading out

- **Icon Selection**: 
  - Crosshairs (play/target icon) - represents aiming
  - Play/Pause (standard controls)
  - ArrowClockwise (restart)
  - Trophy (final score display and achievements)
  - Lightning (speed/difficulty indicator and speed targets)
  - Target (bullseye for hit markers)
  - Fire (combo indicator)
  - ListNumbers (leaderboard access)
  - Star (bonus targets)

- **Spacing**: 
  - Game container: p-6 for outer padding
  - Stats cards: p-4 with gap-4 between cards
  - Button groups: gap-3 for action buttons
  - Target spawn area: Maintains 24px margin from edges
  - Score display: px-6 py-3 for prominence
  - Combo display: Fixed position top-right with padding

- **Mobile**: 
  - Touch-optimized target sizes (minimum 44px)
  - Stack stats vertically on mobile vs horizontal on desktop
  - Simplified button layout in single column
  - Game area scales to available viewport
  - Larger touch targets for difficulty selection
  - Timer and score positioned at top on mobile, sidebar on desktop
  - Combo display scales down on small screens
  - Leaderboard dialog scrollable on mobile
