# Planning Guide

An interactive shooting target game where players click on moving targets to score points, featuring multiple difficulty levels and real-time score tracking.

**Experience Qualities**:
1. **Exciting** - Fast-paced action with immediate feedback creates an adrenaline-pumping experience
2. **Challenging** - Progressive difficulty levels test player skill and reaction time
3. **Rewarding** - Clear scoring system and accuracy tracking provide satisfying achievement feedback

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-view game with multiple interactive features including target spawning, scoring system, difficulty settings, and game state management, making it a light application rather than a micro tool.

## Essential Features

### Target Shooting Mechanics
- **Functionality**: Targets appear randomly on screen and move, players click to shoot them
- **Purpose**: Core gameplay loop that tests player accuracy and reaction time
- **Trigger**: Targets spawn automatically at intervals based on difficulty level
- **Progression**: Target appears → Moves across screen → Player clicks to hit → Target disappears with visual feedback → Score updates
- **Success criteria**: Click detection works accurately, hit/miss is clearly communicated, targets spawn consistently

### Scoring System
- **Functionality**: Tracks hits, misses, total shots, accuracy percentage, and cumulative score
- **Purpose**: Provides achievement feedback and measures player performance
- **Trigger**: Updates automatically on each shot fired
- **Progression**: Player shoots → Hit/miss detected → Score increments/decrements → Statistics update → Display refreshes
- **Success criteria**: Accurate counting, percentage calculations correct, score persists during session

### Difficulty Levels
- **Functionality**: Three difficulty modes (Easy, Medium, Hard) that adjust target speed and spawn rate
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
- **Rapid clicking**: Prevent score manipulation by limiting shots or tracking wasted shots in accuracy
- **Window resize**: Targets reposition gracefully, game pauses during significant layout changes
- **Target overlap**: Clicking registers only one hit, topmost target takes priority
- **Spam clicking empty space**: Counts as misses, negatively affects accuracy
- **Timer completion during target hit**: Properly registers final shots before game over

## Design Direction
The design should evoke a sense of focused intensity with a modern shooting range aesthetic - clean, precise, and action-oriented with bold contrasts and sharp visual feedback.

## Color Selection
A high-contrast color scheme inspired by shooting ranges and targeting systems, emphasizing visibility and precision.

- **Primary Color**: Deep Navy Blue (oklch(0.25 0.05 250)) - Professional, focused atmosphere reminiscent of shooting ranges
- **Secondary Colors**: Electric Cyan (oklch(0.75 0.15 210)) for UI elements and active states; Dark Charcoal (oklch(0.18 0.01 260)) for backgrounds
- **Accent Color**: Vibrant Orange Red (oklch(0.65 0.22 35)) - High-visibility color for targets and critical actions, demands attention
- **Foreground/Background Pairings**: 
  - Primary Navy (oklch(0.25 0.05 250)): White text (oklch(0.98 0 0)) - Ratio 9.2:1 ✓
  - Background Dark (oklch(0.15 0.02 260)): Cyan text (oklch(0.75 0.15 210)) - Ratio 5.8:1 ✓
  - Accent Orange (oklch(0.65 0.22 35)): White text (oklch(0.98 0 0)) - Ratio 5.1:1 ✓
  - Card backgrounds (oklch(0.20 0.03 255)): Light gray text (oklch(0.85 0.02 260)) - Ratio 7.5:1 ✓

## Font Selection
Typography should communicate precision and modernity with strong readability for quick number recognition during fast gameplay.

- **Typographic Hierarchy**:
  - H1 (Game Title): Space Grotesk Bold/36px/tight tracking (-0.02em)
  - H2 (Score Display): JetBrains Mono Bold/48px/monospace for consistent digit width
  - Body (Instructions/Stats): Space Grotesk Medium/16px/relaxed leading (1.6)
  - Button Labels: Space Grotesk SemiBold/14px/wide tracking (0.05em)
  - Timer Display: JetBrains Mono Bold/32px/monospace for digit stability

## Animations
Animations emphasize the shooting action with snappy, responsive feedback for hits and smooth motion for targets, creating moments of satisfaction on successful shots.

- Target movement: Smooth linear/eased motion depending on difficulty
- Hit feedback: Quick scale + fade out (150ms) with particle burst effect
- Miss indicator: Subtle red flash on game area (100ms)
- Score increment: Number pop animation (200ms spring) when points earned
- Button interactions: Slight lift effect on hover (150ms ease-out)
- Game state transitions: Fade in/out overlays (300ms)

## Component Selection
- **Components**: 
  - Card (for score display and game stats with subtle shadow)
  - Button (for start/pause/restart with variant styles for different actions)
  - Badge (for difficulty indicator and game status)
  - Progress (for timer visualization as horizontal bar)
  - Separator (for dividing stats sections)
  - Dialog (for game over screen with final statistics)
  
- **Customizations**: 
  - Custom target component (circular SVG with crosshair design)
  - Custom game canvas area (full-screen playable zone with boundary indicators)
  - Animated hit effect component (expanding circles/particles on successful hit)
  - Custom timer display (large prominent numbers with warning states)

- **States**: 
  - Buttons: Default, hover (lifted), active (pressed down), disabled (muted)
  - Targets: Default, hover (highlighted), hit (explosion animation)
  - Timer: Normal (cyan), warning <10s (yellow), critical <5s (red pulse)
  - Game status badge: Idle (muted), Active (cyan pulse), Paused (amber), Complete (green)

- **Icon Selection**: 
  - Crosshairs (play/target icon) - represents aiming
  - Play/Pause (standard controls)
  - ArrowClockwise (restart)
  - Trophy (final score display)
  - Lightning (speed/difficulty indicator)
  - Target (bullseye for hit markers)

- **Spacing**: 
  - Game container: p-6 for outer padding
  - Stats cards: p-4 with gap-4 between cards
  - Button groups: gap-3 for action buttons
  - Target spawn area: Maintains 24px margin from edges
  - Score display: px-6 py-3 for prominence

- **Mobile**: 
  - Touch-optimized target sizes (minimum 44px)
  - Stack stats vertically on mobile vs horizontal on desktop
  - Simplified button layout in single column
  - Game area scales to available viewport
  - Larger touch targets for difficulty selection
  - Timer and score positioned at top on mobile, sidebar on desktop
