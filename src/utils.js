export const default21Channels = [
  { type: "a1", name: "A1" },
  { type: "t3", name: "T3" },
  { type: "p3", name: "P3" },
  { type: "c3", name: "C3" },
  { type: "cz", name: "Cz" },
  { type: "f7", name: "F7" },
  { type: "o2", name: "O2" },
  { type: "t5", name: "T5" },
  { type: "c4", name: "C4" },
  { type: "f8", name: "F8" },
  { type: "pz", name: "Pz" },
  { type: "fp2", name: "Fp2" },
  { type: "f4", name: "F4" },
  { type: "o1", name: "O1" },
  { type: "f3", name: "F3" },
  { type: "fp1", name: "Fp1" },
  { type: "fz", name: "Fz" },
  { type: "a2", name: "A2" },
  { type: "t6", name: "T6" },
  { type: "t4", name: "T4" },
  { type: "p4", name: "P4" }
];

const sin = (angle) => {
  return Math.sin(angle * (Math.PI / 180));
};

const cos = (angle) => {
  return Math.cos(angle * (Math.PI / 180));
};

export const getChannelPosition = (channelType, r1, r2, r3) => {
  const yMid = 1.69;
  const yR1 = 1.65;
  const yR2 = 1.5;
  const yR3 = 1.1;
  switch (channelType) {
    case "cz":
      return { x: 0, y: yMid, z: 0, rotX: 0, rotY: 0, rotZ: 0 };
    case "pz":
      return {
        x: r1 * cos(90),
        y: yR1,
        z: r1 * sin(90),
        rotX: 0.2,
        rotY: 0,
        rotZ: 0
      };
    case "p3":
      return {
        x: r1 * cos(135),
        y: yR1 - 0.01,
        z: r1 * sin(135),
        rotX: 0.2,
        rotY: 0,
        rotZ: 0.3
      };
    case "p4":
      return {
        x: r1 * cos(45),
        y: yR1 - 0.01,
        z: r1 * sin(45),
        rotX: 0.2,
        rotY: 0,
        rotZ: -0.3
      };
    case "c3":
      return {
        x: r1 * cos(180),
        y: yR1 - 0.02,
        z: r1 * sin(180),
        rotX: 0.1,
        rotY: 0,
        rotZ: 0.4
      };
    case "c4":
      return {
        x: r1 * cos(0),
        y: yR1 - 0.02,
        z: r1 * sin(0),
        rotX: 0.1,
        rotY: 0,
        rotZ: -0.4
      };
    case "f3":
      return {
        x: r1 * cos(-135),
        y: yR1,
        z: r1 * sin(-135),
        rotX: -0.2,
        rotY: 0,
        rotZ: 0.3
      };
    case "f4":
      return {
        x: r1 * cos(-45),
        y: yR1,
        z: r1 * sin(-45),
        rotX: -0.2,
        rotY: 0,
        rotZ: -0.3
      };

    case "fz":
      return {
        x: r1 * cos(-90),
        y: yR1 + 0.02,
        z: r1 * sin(-90),
        rotX: -0.2,
        rotY: 0.5,
        rotZ: 0
      };

    case "o1":
      return {
        x: r2 * cos(110),
        y: yR2 + 0.01,
        z: r2 * sin(110),
        rotX: 0.5,
        rotY: 0,
        rotZ: 0.3
      };
    case "o2":
      return {
        x: r2 * cos(70),
        y: yR2 + 0.01,
        z: r2 * sin(70),
        rotX: 0.5,
        rotY: 0,
        rotZ: -0.3
      };
    case "t5":
      return {
        x: r2 * cos(150),
        y: yR2 - 0.08,
        z: r2 * sin(150),
        rotX: 0,
        rotY: 0.5,
        rotZ: 0.8
      };
    case "t6":
      return {
        x: r2 * cos(30),
        y: yR2 - 0.08,
        z: r2 * sin(30),
        rotX: 0,
        rotY: -0.5,
        rotZ: -0.8
      };
    case "t3":
      return {
        x: r2 * cos(180),
        y: yR2 - 0.1,
        z: r2 * sin(180),
        rotX: -0.3,
        rotY: 0.2,
        rotZ: 1
      };
    case "t4":
      return {
        x: r2 * cos(0),
        y: yR2 - 0.1,
        z: r2 * sin(0),
        rotX: -0.3,
        rotY: -0.2,
        rotZ: -1
      };
    case "f7":
      return {
        x: r2 * cos(-150),
        y: yR2 - 0.05,
        z: r2 * sin(-150),
        rotX: -0.2,
        rotY: 0,
        rotZ: 0.8
      };
    case "f8":
      return {
        x: r2 * cos(-30),
        y: yR2 - 0.05,
        z: r2 * sin(-30),
        rotX: -0.2,
        rotY: 0,
        rotZ: -0.8
      };
    case "fp1":
      return {
        x: r2 * cos(-110),
        y: yR2 + 0.02,
        z: r2 * sin(-110),
        rotX: -0.9,
        rotY: 0.5,
        rotZ: 0.4
      };
    case "fp2":
      return {
        x: r2 * cos(-70),
        y: yR2 + 0.02,
        z: r2 * sin(-70),
        rotX: -0.9,
        rotY: -0.5,
        rotZ: -0.4
      };

    case "a1":
      return {
        x: r3 * cos(180),
        y: yR3,
        z: r3 * sin(180),
        rotX: 0,
        rotY: 0,
        rotZ: 1.5
      };
    case "a2":
      return {
        x: r3 * cos(0),
        y: yR3,
        z: r3 * sin(0),
        rotX: 0,
        rotY: 0,
        rotZ: -1.5
      };

    default:
      return { x: 100, y: 100, z: 100, rotation: 0 };
  }
};
