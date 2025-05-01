# File: visuals/spiral_reactor_simulation.py
# Simulation of the Spiral Reactor Core and Holohedron Ignition Protocol (Codex Node 4.3.74)

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from scipy.integrate import odeint
import warnings
warnings.filterwarnings("ignore")  # Suppress warnings for cleaner output

# Harmonic constants (from Codex)
pi_H = 432432 / 137500  # 3.14496
phi = 144 / 89  # ≈ 0.7499880492
psi_0 = 11 / 12  # ≈ 0.9166666667
base_freq = 432  # Codex base frequency (Hz)

# Reactor parameters
R = 1.0  # Major radius (units)
r = phi  # Minor radius (units)
activation_freq = 33 * 139  # 4587 Hz (Holohedron activation frequency)
hum_freq = 370  # F♯ humming frequency (Hz)
sub_beat_freq = 139  # Sub-beat frequency (Hz)

# Holohedron parameters
num_facets = 64  # 64 facets (mirroring DNA codons, I Ching hexagrams)
rotation_speed = phi**2  # ≈ 2.618 radians/s
qubit_states = np.zeros(num_facets, dtype=int)  # Trinary states: -1 (–∞), 0 (null), 1 (+∞)

# Simulation parameters
t_max = 10.0  # Simulation time (seconds)
dt = 0.01  # Time step
t = np.arange(0, t_max, dt)
num_steps = len(t)

# Harmonic oscillator for the spiral core's breathing effect
def harmonic_oscillator(state, t, freq, damping):
    x, v = state
    dxdt = v
    dvdt = -(2 * np.pi * freq)**2 * x - damping * v  # Simple harmonic motion with damping
    return [dxdt, dvdt]

# Initial conditions for the oscillator (breathing radius)
x0 = 1.5  # Initial radius of the spiral core
v0 = 0.0  # Initial velocity
state0 = [x0, v0]
damping = 0.1  # Damping factor
oscillator_states = odeint(harmonic_oscillator, state0, t, args=(base_freq, damping))
breathing_radius = oscillator_states[:, 0]

# Frequency interaction (activation frequency + humming frequency)
activation_wave = np.sin(2 * np.pi * activation_freq * t)
hum_wave = np.sin(2 * np.pi * hum_freq * t)
sub_beat_wave = np.sin(2 * np.pi * sub_beat_freq * t)
combined_wave = activation_wave + 0.5 * hum_wave + 0.2 * sub_beat_wave

# Ritual steps (triggered at specific times)
ritual_steps = {
    "tetrahedron_formation": 1.0,  # Form tetrahedron at t = 1s
    "whisper_hum": 2.0,  # Whisper and hum at t = 2s
    "visualization": 3.0,  # Visualize Holohedron at t = 3s
    "clap_circle": 4.0,  # Clap and trace circle at t = 4s
    "breathing": 5.0,  # Start 13 breaths at t = 5s
    "execute": 8.0,  # Declare "Ω-PRIME EXECUTE" at t = 8s
}

# Holohedron qubit state transitions (trinary pulse loop: Sound → Silence → Ingestion)
def update_qubit_states(t_current, qubit_states):
    if t_current >= ritual_steps["whisper_hum"]:
        # Sound phase: Randomly set some qubits to +1 or -1
        if t_current < ritual_steps["visualization"]:
            for i in range(num_facets):
                if np.random.random() < 0.1:  # 10% chance to change state
                    qubit_states[i] = np.random.choice([-1, 1])
        # Silence (Observation): Reset some qubits to 0
        elif t_current < ritual_steps["clap_circle"]:
            for i in range(num_facets):
                if np.random.random() < 0.05:  # 5% chance to reset
                    qubit_states[i] = 0
        # Ingestion (Re-sound): Reinforce states
        elif t_current >= ritual_steps["execute"]:
            for i in range(num_facets):
                if qubit_states[i] == 0 and np.random.random() < 0.2:
                    qubit_states[i] = np.random.choice([-1, 1])
    return qubit_states

# Set up the animation
fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(10, 12), gridspec_kw={'height_ratios': [2, 1, 1]})
fig.suptitle("Spiral Reactor Core and Holohedron Ignition Simulation", fontsize=16)

# Reactor plot (ax1)
ax1.set_xlim(-5, 5)
ax1.set_ylim(-5, 5)
ax1.set_aspect('equal')
ax1.set_title("Reactor Core Dynamics")
ax1.set_xlabel("X (units)")
ax1.set_ylabel("Y (units)")

# Reactor shell
shell = plt.Circle((0, 0), 4, fill=False, color='blue', linewidth=2, label="Light Resonant Shell")
ax1.add_patch(shell)

# Spiral core (breathing)
core = plt.Circle((0, 0), 1.5, color='cyan', alpha=0.5, label="Spiral Resonator Core")
ax1.add_patch(core)

# Phase modulators
phase_mods = []
for angle in [45, 135, 225, 315]:
    rad = np.radians(angle)
    line, = ax1.plot([0, 4 * np.cos(rad)], [0, 4 * np.sin(rad)], 'r-', lw=2)
    phase_mods.append(line)

# Harmonic bloom rings
bloom_rings = []
for r in [0.5, 1.0, 1.5, 2.0, 2.5]:
    ring = plt.Circle((0, 0), r, fill=False, color='cyan', linestyle='--', alpha=0.8-0.1*r)
    ax1.add_patch(ring)
    bloom_rings.append(ring)

# Sensors
sensors = []
for pos in [(2, 2), (-2, 2), (2, -2), (-2, -2)]:
    sensor = plt.Circle(pos, 0.3, color='yellow', alpha=0.5)
    ax1.add_patch(sensor)
    sensors.append(sensor)

ax1.legend()

# Waveform plot (ax2)
ax2.set_xlim(0, t_max)
ax2.set_ylim(-3, 3)
ax2.set_title("Frequency Interaction (Activation + Humming + Sub-beat)")
ax2.set_xlabel("Time (s)")
ax2.set_ylabel("Amplitude")
wave_line, = ax2.plot([], [], 'g-', label="Combined Wave")
ax2.legend()

# Qubit states plot (ax3)
ax3.set_xlim(0, num_facets)
ax3.set_ylim(-1.5, 1.5)
ax3.set_title("Holohedron Topological Qubit States")
ax3.set_xlabel("Facet Index")
ax3.set_ylabel("State (-1, 0, 1)")
qubit_scatter = ax3.scatter(range(num_facets), qubit_states, c=qubit_states, cmap='coolwarm', vmin=-1, vmax=1)

# Animation update function
def update(frame):
    t_current = frame * dt

    # Update spiral core (breathing)
    core_radius = breathing_radius[frame]
    core.set_radius(core_radius)
    if t_current >= ritual_steps["execute"]:
        core.set_color('orange')  # Ignition effect

    # Update harmonic bloom rings
    for i, ring in enumerate(bloom_rings):
        r_base = 0.5 * (i + 1)
        ring.set_radius(r_base + 0.1 * np.sin(2 * np.pi * base_freq * t_current))

    # Update waveform
    wave_line.set_data(t[:frame], combined_wave[:frame])

    # Update qubit states
    global qubit_states
    qubit_states = update_qubit_states(t_current, qubit_states)
    qubit_scatter.set_offsets(np.c_[range(num_facets), qubit_states])
    qubit_scatter.set_array(qubit_states)

    return [core, wave_line, qubit_scatter] + bloom_rings

# Create animation
ani = FuncAnimation(fig, update, frames=num_steps, interval=50, blit=True)

# Save and show animation
plt.tight_layout()
ani.save('visuals/spiral_reactor_simulation.gif', writer='pillow', fps=20)
plt.show()
