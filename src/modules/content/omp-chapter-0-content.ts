import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Optics and Modern Physics Chapter 0 — Reflection and Refraction.
 * The ray model, the two laws (reflection, Snell) and the New Cartesian
 * sign convention; the mirror formula and the single-surface refraction
 * formula derived from geometry; apparent depth and total internal
 * reflection, the two refraction results JEE asks every year.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "rays-and-plane-mirrors",
  title: "0.1 · Rays and Plane Mirrors",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stand in front of a bathroom mirror that is only half as tall as you, hung at the right height, and you can see yourself from the top of your head to your shoes. Step back and you still see all of you, no more and no less. That sounds like a trick, but it follows from one rule about how light bounces, plus the fact that light travels in straight lines. By the end of this lesson you will be able to prove it with two pairs of similar triangles.",
    },
    {
      type: "text",
      content:
        "**The ray model.** Light is a wave with a wavelength of about $400$ to $700$ nm. Mirrors, lenses, people and rooms are millions of times bigger than that. When every object in the problem is much larger than the wavelength, the wave behaves as if its energy travels along straight lines called **rays**. A ray is the direction the light is going; a narrow beam from a torch is a good picture of a bundle of rays. Rays fail only when slits, films or apertures shrink to a few wavelengths, and that is the business of Chapter 2 (wave optics).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The laws of reflection",
      content:
        "At the point where a ray meets a mirror, draw the **normal** (the line perpendicular to the surface). Measure angles from the normal, not from the surface.\n1. The incident ray, the reflected ray and the normal lie in one plane.\n2. The angle of reflection equals the angle of incidence: $r = i$.\nThese hold for every mirror, flat or curved, because a small enough patch of a curved mirror is flat.",
    },
    {
      type: "text",
      content:
        "**How a plane mirror makes an image.** Take a point object O at distance $x$ in front of a mirror. Rays leave O in all directions; each obeys $r = i$. Draw two of them. The reflected rays spread apart (diverge), so they never actually meet in front of the mirror. But if your eye catches them and traces them straight back, they appear to come from a single point I behind the mirror. The triangle made by O, the point where a ray strikes, and the foot of the perpendicular is congruent to the triangle made with I (same angle, shared side), so I is exactly as far behind the mirror as O is in front.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Image in a plane mirror",
      content:
        "The image is **virtual** (no light actually reaches it; rays only appear to come from it), **erect**, the **same size** as the object, and as far behind the mirror as the object is in front. It is **laterally inverted**: your right hand appears as the image's left hand, because front and back are swapped while up and left stay put.\nIn the sign convention of 0.2 (distances from the mirror, along the incident light positive), an object at $u$ has its image at $v = -u$.",
    },
    {
      type: "text",
      content:
        "Drag the object towards and away from the mirror below. Watch the dashed back-extensions of the reflected rays.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "plane-mirror",
        objectDistance: { min: 5, max: 40, step: 1, initial: 20 },
        caption:
          "The object sits to the left, so u is negative. However you move it, the dashed extensions of the reflected rays meet at v = −u, just as far behind the mirror.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the reflected rays always diverge, their extensions always meet behind the mirror, and the readout always shows $v = -u$ with magnification $+1$. Moving the object 5 cm closer moves the image 5 cm closer from the other side, so object and image approach each other by 10 cm.",
    },
    {
      type: "text",
      content:
        "**Derivation 1: rotating the mirror turns the reflected ray by twice as much.** Keep the incident ray fixed. With angle of incidence $i$, the reflected ray is turned away from the incident direction by the **deviation** $\\delta = 180^\\circ - 2i$ (the ray reverses, minus the two equal angles it makes with the normal). Now rotate the mirror by $\\theta$. The normal rotates with it, so the angle of incidence becomes $i + \\theta$ (or $i - \\theta$). The new deviation is $180^\\circ - 2(i \\pm \\theta)$, which differs from the old one by $2\\theta$.",
    },
    { type: "math", latex: "\\text{mirror turns by } \\theta \\;\\Longrightarrow\\; \\text{reflected ray turns by } 2\\theta" },
    {
      type: "text",
      content:
        "This is why galvanometers and old sextants use a mirror as a pointer: a tiny rotation of the mirror moves the light spot twice as far across the scale.",
    },
    {
      type: "text",
      content:
        "**Derivation 2: the half-height mirror.** Let a person of height $H$ stand upright with eyes E at height $e$ above the floor. To see the top of the head T, light from T must reflect off the mirror into E. By $r = i$, the reflection point lies level with the **midpoint** of T and E (the triangle from T to the mirror and back to E is isosceles, so the ray hits halfway up between them). Likewise the ray from the feet F reaches E after reflecting at the level of the midpoint of F and E. The mirror needs to cover only the stretch between those two points:",
    },
    {
      type: "math",
      latex:
        "\\text{length} = \\frac{H + e}{2} - \\frac{e}{2} = \\frac{H}{2}",
    },
    {
      type: "text",
      content:
        "The eye height $e$ and the distance to the mirror both cancel. So walking back does not help you see more of yourself: you see more of the room behind you, but always exactly your own height in a half-height mirror.",
    },
    {
      type: "text",
      content:
        "**Derivation 3: two inclined mirrors.** Two mirrors meeting at angle $\\theta$ produce images of images: each image in mirror 1 acts as an object for mirror 2 and so on. All the images lie on a circle through the object, centred on the line where the mirrors meet, and they are spaced out in steps set by $\\theta$. Counting how many fit gives the standard rule, with $m = 360^\\circ/\\theta$:",
    },
    {
      type: "table",
      headers: ["$m = 360^\\circ/\\theta$", "Object position", "Number of images"],
      rows: [
        ["even", "anywhere between the mirrors", "$m - 1$"],
        ["odd", "on the bisector of the angle", "$m - 1$"],
        ["odd", "not on the bisector", "$m$"],
        ["$\\theta = 0$ (parallel mirrors)", "anywhere", "infinitely many"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 (rotation of the reflected ray).** A ray strikes a plane mirror at $i = 30^\\circ$. The mirror is turned by $10^\\circ$ so that the angle of incidence becomes $40^\\circ$. Through what angle does the reflected ray turn?\n\n1. Old deviation: $\\delta_1 = 180^\\circ - 2(30^\\circ) = 120^\\circ$. *Why this step:* the deviation tells you where the reflected ray points relative to the fixed incident ray.\n2. New deviation: $\\delta_2 = 180^\\circ - 2(40^\\circ) = 100^\\circ$.\n3. The reflected ray has turned by $120^\\circ - 100^\\circ = 20^\\circ = 2 \\times 10^\\circ$. ✓\n\n**Worked example 2 (the mirror you need).** A girl 1.60 m tall has her eyes 10 cm below the top of her head. Find the shortest plane mirror in which she can see her full image, and where its lower edge must be.\n\n1. Eyes at $e = 1.50$ m. The top edge sits at the midpoint of eye and head: $\\frac{1.50 + 1.60}{2} = 1.55$ m. *Why this step:* the ray from the top of her head must reflect halfway (in height) between the head and the eye.\n2. The lower edge sits at the midpoint of eye and feet: $\\frac{1.50 + 0}{2} = 0.75$ m above the floor.\n3. Length $= 1.55 - 0.75 = 0.80$ m $= H/2$. ✓ Any distance from the mirror works.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (speed of an image).** Put the mirror along a vertical line at position $x_M$ and the object at $x_O$. The image is as far behind as the object is in front, so\n\n1. $x_I - x_M = x_M - x_O$, giving $x_I = 2x_M - x_O$. *Why this step:* a position equation can be differentiated; a sentence cannot.\n2. Differentiate: $v_I = 2v_M - v_O$ for the velocity components **perpendicular** to the mirror. Components parallel to the mirror are copied unchanged.\n3. (a) A man stands still and the mirror moves away from him at 2 m/s: $v_I = 2(2) - 0 = 4$ m/s away from him. The image moves at **twice** the mirror's speed.\n4. (b) The mirror is fixed and the man walks towards it at 3 m/s: $v_I = 0 - 3 = -3$, so the image walks towards the mirror at 3 m/s from the other side. Relative to the man it approaches at $3 + 3 = 6$ m/s.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a velocity vector, JEE Main style).** A plane mirror lies along the y-axis. An insect in front of it moves with velocity $(3\\hat i + 4\\hat j)$ m/s. Find the velocity of its image and the image's speed relative to the insect.\n\n1. The x-component is perpendicular to the mirror, so it flips: $-3\\hat i$. The y-component is parallel, so it stays: $4\\hat j$. *Why this step:* reflection reverses only the front–back direction.\n2. $\\vec v_I = (-3\\hat i + 4\\hat j)$ m/s, speed 5 m/s, the same as the insect's.\n3. Relative velocity: $\\vec v_I - \\vec v_O = -6\\hat i$, so 6 m/s straight towards (or away from) the insect along the normal.\n\n**Worked example 5 (counting images).** (a) Mirrors at $60^\\circ$: $m = 360/60 = 6$, even, so $6 - 1 = 5$ images wherever the object is. (b) Mirrors at $72^\\circ$: $m = 5$, odd, so 4 images if the object is on the bisector and 5 if it is not. *Why this step:* when $m$ is odd, the last two images coincide only when the object is placed symmetrically.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"you need a mirror as tall as you are\"",
      content:
        "Half your height is enough, and the distance from the mirror does not matter. The ray from your head reflects at the level halfway between head and eye, and the ray from your feet at the level halfway between feet and eye, because reflection makes each ray come in and go out at equal angles. The mirror only has to span the gap between those two levels, which is $H/2$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the image is on the mirror's surface\"",
      content:
        "The image is behind the mirror, as far behind as the object is in front. Focus a camera on the dust on a mirror and your reflection is blurred; focus on your reflection and the dust blurs. They are at different distances.",
    },
    {
      type: "quiz",
      id: "omp0-1-q1",
      variant: "concept",
      question: "A man 1.70 m tall stands 2 m from a wall mirror. What is the shortest mirror in which he can see his full image?",
      options: [
        { text: "1.70 m", feedback: "That is the misconception. The reflection points for head and feet are halfway (in height) between them and the eye." },
        { text: "0.85 m", correct: true, feedback: "Half his height, $H/2$, whatever his distance from the mirror." },
        { text: "0.425 m", feedback: "You halved twice. The top edge sits at the head–eye midpoint and the bottom edge at the eye–feet midpoint: the gap is $H/2$." },
        { text: "It depends on how far he stands from the mirror.", feedback: "The distance cancels out in the similar-triangle argument. Stepping back shows more of the room, not more of you." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-1-q2",
      variant: "practice",
      question: "A plane mirror is rotated by $15^\\circ$ while the incident ray stays fixed. Through what angle does the reflected ray turn?",
      options: [
        { text: "$15^\\circ$", feedback: "The normal turns by $15^\\circ$, but the reflected ray is on the other side of the normal and turns by twice that." },
        { text: "$7.5^\\circ$", feedback: "It is the other way round: the ray turns by double the mirror's rotation, not half." },
        { text: "$30^\\circ$", correct: true, feedback: "The deviation $180^\\circ - 2i$ changes by $2\\theta = 30^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-1-q3",
      variant: "practice",
      question: "How many images of a coin placed between two plane mirrors inclined at $90^\\circ$ can be seen?",
      options: [
        { text: "3", correct: true, feedback: "$m = 4$ is even, so there are $m - 1 = 3$ images." },
        { text: "4", feedback: "$360/90 = 4$ is $m$. For even $m$ the number of images is $m - 1$, because two of the images coincide." },
        { text: "2", feedback: "Two are the direct images in each mirror. The third is the image of an image, seen in the corner." },
        { text: "Infinitely many", feedback: "Infinitely many images need parallel mirrors ($\\theta = 0$)." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-1-q4",
      variant: "practice",
      question: "A boy walks towards a fixed plane mirror at 3 m/s. How fast does his image approach him?",
      options: [
        { text: "3 m/s", feedback: "That is the image's speed relative to the ground (or the mirror). Relative to the boy, both are closing in." },
        { text: "0", feedback: "The image moves: it always stays as far behind the mirror as the boy is in front." },
        { text: "1.5 m/s", feedback: "Nothing gets halved here. Use $x_I = 2x_M - x_O$ with the mirror fixed." },
        { text: "6 m/s", correct: true, feedback: "The image comes towards the mirror at 3 m/s from the other side, so the gap closes at $3 + 3 = 6$ m/s." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-1-q5",
      variant: "concept",
      question: "A candle stands 40 cm in front of a plane mirror. Where must a camera focus to get a sharp picture of the candle's image?",
      options: [
        { text: "On the mirror surface, 40 cm from the candle.", feedback: "The image is not on the glass. Rays only appear to come from a point behind it." },
        { text: "80 cm behind the mirror.", feedback: "The image is 40 cm behind the mirror. 80 cm is its distance from the candle." },
        { text: "40 cm behind the mirror, so 80 cm from the candle.", correct: true, feedback: "The image is as far behind the mirror as the object is in front." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-1-q6",
      variant: "practice",
      question: "Two plane mirrors meet at $72^\\circ$. An object is placed on the bisector of the angle between them. How many images are formed?",
      options: [
        { text: "5", feedback: "That is the count when the object is off the bisector. On the bisector the last two images coincide." },
        { text: "4", correct: true, feedback: "$m = 360/72 = 5$ is odd and the object is symmetric, so $m - 1 = 4$." },
        { text: "6", feedback: "The number of images never exceeds $m = 5$ here." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "spherical-mirrors-and-sign-convention",
  title: "0.2 · Spherical Mirrors and the Sign Convention",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A car's passenger-side mirror carries a warning: *objects in mirror are closer than they appear*. That mirror bulges outwards. The bulge squeezes a wide view into a small mirror, but it also makes everything look smaller and therefore farther away. A dentist's mirror curves the other way and makes a tooth look bigger. To predict both, we need names for the parts of a curved mirror and a single sign convention that works for every case.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Anatomy of a spherical mirror",
      content:
        "A spherical mirror is a piece cut from a reflecting sphere.\n- **Pole P**: the centre of the mirror's surface.\n- **Centre of curvature C**: the centre of the sphere; radius of curvature $R = PC$.\n- **Principal axis**: the line through P and C.\n- **Principal focus F**: where rays arriving parallel to the axis meet after reflection (concave), or appear to diverge from (convex). Focal length $f = PF$.\n**Concave** mirrors reflect from the inside of the sphere (C in front); **convex** mirrors reflect from the outside (C behind).",
    },
    {
      type: "text",
      content:
        "**Derivation: $f = R/2$.** Send a ray parallel to the axis at height $h$. It hits a concave mirror at M. The radius CM is the normal there. Call the angle of incidence $\\theta$ (between the ray and CM). Because the incoming ray is parallel to the axis, the angle MCP between the radius and the axis is also $\\theta$ (alternate angles). The reflected ray leaves at $\\theta$ on the other side of CM and crosses the axis at F. In triangle CFM, the angles at C and at M are both $\\theta$, so the triangle is **isosceles**: $FC = FM$.",
    },
    {
      type: "text",
      content:
        "Drop the perpendicular from F to CM: it bisects CM, so $FC\\cos\\theta = R/2$, giving $FC = \\dfrac{R}{2\\cos\\theta}$. Then",
    },
    { type: "math", latex: "PF = R - \\frac{R}{2\\cos\\theta} \\;\\xrightarrow{\\;\\theta \\to 0\\;}\\; R - \\frac R2 = \\frac R2" },
    {
      type: "text",
      content:
        "For rays close to the axis (**paraxial** rays, small $h$ and small $\\theta$), $\\cos\\theta \\approx 1$ and every parallel ray passes through the same point, $f = R/2$. Rays far from the axis cross closer to the mirror. That blur is called **spherical aberration**, and it is why big searchlights use parabolic rather than spherical mirrors.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The New Cartesian sign convention",
      content:
        "Draw the incident light travelling **left to right**, with the mirror (or lens) at the origin.\n1. Measure every distance **from the pole** P (for lenses, from the optical centre).\n2. Distances measured **along** the direction of the incident light (to the right) are **positive**; against it (to the left) are **negative**.\n3. Heights **above** the axis are positive, below are negative.\nSo a real object in front of a mirror always has $u < 0$. A concave mirror has C and F in front: $R < 0$, $f < 0$. A convex mirror has them behind: $R > 0$, $f > 0$. In both cases $f = R/2$ with signs.",
    },
    {
      type: "table",
      headers: ["Quantity", "Concave mirror", "Convex mirror"],
      rows: [
        ["Object distance $u$ (real object)", "negative", "negative"],
        ["Radius $R$, focal length $f$", "negative", "positive"],
        ["Real image (in front)", "$v < 0$", "never"],
        ["Virtual image (behind)", "$v > 0$", "$v > 0$, always"],
        ["Erect image height", "$h' > 0$", "$h' > 0$"],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "The three principal rays",
      content:
        "Any two locate an image; the third is a check.\n1. A ray **parallel** to the axis reflects **through F** (concave) or as if **from F** (convex).\n2. A ray **through F** (or heading towards F, for convex) reflects **parallel** to the axis. This is ray 1 run backwards: light paths are reversible.\n3. A ray **through C** (or heading towards C) hits the mirror along the normal and comes straight back. A ray to the **pole** reflects symmetrically about the axis.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "concave-mirror",
        objectDistance: { min: 5, max: 60, step: 1, initial: 40 },
        focalLength: { min: 10, max: 25, step: 1, initial: 15 },
        rays: ["parallel", "centre", "focal"],
        caption:
          "Concave mirror, all three principal rays. Light comes from the left, so u, f and R are negative and a real image has v < 0.",
      },
    },
    {
      type: "text",
      content:
        "Check each ray on the diagram: the parallel ray bends through F, the ray through F returns parallel, and the ray aimed through C comes back on itself. Now switch to a bulging mirror.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "convex-mirror",
        objectDistance: { min: 5, max: 60, step: 1, initial: 30 },
        focalLength: { min: 10, max: 25, step: 1, initial: 15 },
        caption:
          "Convex mirror: F and C are behind the mirror, so f > 0. The reflected rays always diverge; their dashed extensions meet behind the mirror.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with the concave mirror, the three rays meet in front of the mirror (real image, $v < 0$) while the object is beyond F, and only their extensions meet behind (virtual image, $v > 0$) once the object comes inside F. With the convex mirror, however you move the object or change $f$, the image stays behind the mirror, upright and smaller, trapped between P and F. That is the car mirror: a wide field of view with shrunken images.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (writing the signs).** (a) A concave mirror of radius 30 cm with an object 20 cm in front. (b) A convex mirror of radius 40 cm.\n\n1. (a) The object is to the left of P, the side the incident light comes from, so $u = -20$ cm. *Why this step:* the sign depends only on which side of P the point lies, measured against the direction of the **incident** light; the reflected light going back leftwards does not change it.\n2. C of a concave mirror is in front (left): $R = -30$ cm, so $f = R/2 = -15$ cm.\n3. (b) C of a convex mirror is behind (right): $R = +40$ cm, $f = +20$ cm.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (how paraxial is paraxial?).** A concave mirror has $|R| = 20$ cm. Where does a ray parallel to the axis cross it after reflection if its height is (a) 1 cm, (b) 12 cm?\n\n1. $\\sin\\theta = h/|R|$, because the radius to the hit point has length $|R|$ and the hit point is $h$ above the axis.\n2. (a) $\\sin\\theta = 0.05$, $\\cos\\theta = 0.99875$, $FC = \\frac{20}{2(0.99875)} = 10.01$ cm, so $PF = 20 - 10.01 = 9.99$ cm: essentially $R/2$.\n3. (b) $\\sin\\theta = 0.6$, $\\cos\\theta = 0.8$, $FC = \\frac{20}{1.6} = 12.5$ cm, so $PF = 7.5$ cm. *Why this step:* the exact triangle shows how badly $f = R/2$ fails once rays are far from the axis.\n4. The 12 cm ray crosses 2.5 cm nearer the mirror. (Even a 6 cm ray, with $\\sin\\theta = 0.3$, crosses at $PF \\approx 9.5$ cm.) Every formula in this chapter assumes paraxial rays.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (an image from two rays).** An object of height $h$ stands at the centre of curvature C of a concave mirror. Locate the image without any formula.\n\n1. Ray to the pole: it reflects symmetrically, so after travelling back a distance $|R|$ it is at height $-h$. *Why this step:* equal angles above and below the axis mean equal and opposite heights at equal distances.\n2. Ray from the tip through F (at $|R|/2$): the line from height $h$ at C to height 0 at F reaches the mirror at height $-h$ (similar triangles, F is the midpoint). It reflects parallel to the axis at height $-h$.\n3. The two reflected rays meet at distance $|R|$ from P, height $-h$: the image is at C, real, inverted and the same size.\n\n**Worked example 4 (why the car mirror is convex, qualitatively).** For a convex mirror every ray from the object reflects outwards, away from the axis, so reflected rays can never meet in front. Tracing them back, the parallel ray seems to come from F behind, and the pole ray seems to come from a point below-behind. They meet between P and F, upright, and smaller the farther the object. A small mirror therefore shows a wide scene, at the price of objects looking farther than they are.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$f = R/2$ holds for every ray\"",
      content:
        "It holds only for paraxial rays. The exact crossing point is $PF = R - \\frac{R}{2\\cos\\theta}$, which slides towards the mirror as rays move away from the axis. A large-aperture spherical mirror therefore does not bring all parallel light to one point.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$u$ is positive because distances are positive\"",
      content:
        "In the New Cartesian convention, distances carry a sign set by direction. A real object sits on the side the light comes from, to the left of P, so $u$ is **negative** every time. Writing $u = +20$ cm in the mirror formula gives a wrong image, not just a wrong sign.",
    },
    {
      type: "quiz",
      id: "omp0-2-q1",
      variant: "practice",
      question: "What is the focal length, with its sign, of a convex mirror of radius of curvature 24 cm?",
      options: [
        { text: "$+12$ cm", correct: true, feedback: "$f = R/2 = +24/2$; C and F lie behind the mirror, along the incident light." },
        { text: "$-12$ cm", feedback: "That is the sign for a concave mirror. A convex mirror's focus is behind it, on the positive side." },
        { text: "$+24$ cm", feedback: "24 cm is the radius. The focus is halfway to C: $f = R/2$." },
        { text: "$-24$ cm", feedback: "Both the sign and the factor of 2 are off: $f = R/2$, and it is positive for convex." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-2-q2",
      variant: "concept",
      question: "A real object is placed 15 cm in front of a mirror. With incident light travelling left to right, what is $u$?",
      options: [
        { text: "$+15$ cm for a convex mirror and $-15$ cm for a concave one", feedback: "The sign of $u$ depends only on where the object is, not on the mirror's shape." },
        { text: "$+15$ cm for either mirror", feedback: "Distances against the incident light are negative, and a real object sits against it." },
        { text: "$-15$ cm for either mirror", correct: true, feedback: "The object is on the side the light comes from, to the left of P: negative." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-2-q3",
      variant: "concept",
      question: "Why does a ray passing through the centre of curvature of a concave mirror reflect straight back along itself?",
      options: [
        { text: "Because it passes through the focus.", feedback: "C and F are different points; the focal ray returns parallel to the axis, not along itself." },
        { text: "Because it travels along a radius, which is the normal, so $i = 0$ and $r = 0$.", correct: true, feedback: "Every radius of a sphere is perpendicular to its surface." },
        { text: "Because it is parallel to the principal axis.", feedback: "A ray through C (from an off-axis point) is generally not parallel to the axis; the parallel ray reflects through F." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-2-q4",
      variant: "concept",
      question: "A wide concave mirror fails to bring sunlight to a sharp point. What is the reason?",
      options: [
        { text: "Different colours reflect at different angles.", feedback: "Reflection obeys $r = i$ for every colour. Colour splitting is a lens and prism effect (1.5)." },
        { text: "Sunlight is not parallel.", feedback: "The Sun is far enough away that its rays are effectively parallel. The problem is the sphere's shape." },
        { text: "Rays far from the axis cross it closer to the mirror than $R/2$ (spherical aberration).", correct: true, feedback: "$PF = R - \\frac{R}{2\\cos\\theta}$ shrinks as $\\theta$ grows." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-2-q5",
      variant: "practice",
      question: "A concave mirror has radius 50 cm. In the New Cartesian convention, what are $R$ and $f$?",
      options: [
        { text: "$R = +50$ cm, $f = +25$ cm", feedback: "Those are the convex-mirror signs." },
        { text: "$R = -50$ cm, $f = -25$ cm", correct: true, feedback: "C and F are in front, on the side the light comes from, so both are negative." },
        { text: "$R = -50$ cm, $f = -100$ cm", feedback: "The focus lies halfway to C, $f = R/2$, not twice as far." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "mirror-formula-and-magnification",
  title: "0.3 · The Mirror Formula and Magnification",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Ray diagrams tell you roughly where an image is. The mirror formula tells you exactly, and with the sign convention it also tells you whether the image is real or virtual, upright or inverted, without a drawing. We derive it from two pairs of similar triangles.",
    },
    {
      type: "text",
      content:
        "**Set-up.** A concave mirror with pole P and focus F. An object AB stands on the axis at B, top at A. It forms a real inverted image A'B'. Use two rays from A: the **ray to the pole** (reflects symmetrically about the axis) and the **parallel ray** (hits the mirror at M and reflects through F). For paraxial rays the mirror is effectively the flat line through P, so M is directly above P and $MP = AB$.",
    },
    {
      type: "text",
      content:
        "**Pair 1.** The ray to the pole makes equal angles with the axis on the way in and out, so triangles $ABP$ and $A'B'P$ are similar:",
    },
    { type: "math", latex: "\\frac{A'B'}{AB} = \\frac{B'P}{BP}" },
    {
      type: "text",
      content:
        "**Pair 2.** The reflected parallel ray passes through F, so triangles $MPF$ and $A'B'F$ are similar (vertically opposite angles at F), with $MP = AB$:",
    },
    { type: "math", latex: "\\frac{A'B'}{AB} = \\frac{B'F}{FP} = \\frac{B'P - FP}{FP}" },
    {
      type: "text",
      content:
        "Set the right-hand sides equal and put in the signs. Every point is to the left of P, so each length is minus its signed coordinate: $B'P = -v$, $BP = -u$, $FP = -f$.",
    },
    {
      type: "math",
      latex:
        "\\frac{-v}{-u} = \\frac{-v + f}{-f} \\;\\Rightarrow\\; \\frac vu = \\frac{v - f}{f} \\;\\Rightarrow\\; vf = uv - uf",
    },
    {
      type: "text",
      content: "Divide every term by $uvf$:",
    },
    { type: "math", latex: "\\frac1u = \\frac1f - \\frac1v \\quad\\Longrightarrow\\quad \\frac1v + \\frac1u = \\frac1f" },
    {
      type: "callout",
      variant: "definition",
      title: "Mirror formula and magnification",
      content:
        "$\\dfrac1v + \\dfrac1u = \\dfrac1f = \\dfrac2R$ and $m = \\dfrac{h'}{h} = -\\dfrac vu$.\nPut every quantity in **with its sign**. Then $v < 0$ means a real image in front, $v > 0$ a virtual image behind; $m < 0$ means inverted, $m > 0$ erect; $|m| > 1$ magnified.\nThe same formula covers concave and convex mirrors and every object position. The derivation used one picture, but the signs make it general.",
    },
    {
      type: "text",
      content:
        "The magnification comes from pair 1: $\\frac{|h'|}{h} = \\frac{-v}{-u} = \\frac vu$, and the image in that picture is inverted ($h' < 0$), so $m = -\\frac vu$.",
    },
    {
      type: "text",
      content:
        "Now let the bench fill in the table for you. The focal length is locked at 15 cm, so C is at 30 cm. Drag the object in from 60 cm, pausing beyond C, at C, between C and F, at F and inside F.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "concave-mirror",
        objectDistance: { min: 5, max: 60, step: 1, initial: 45 },
        focalLength: { min: 15, max: 15, step: 1, initial: 15 },
        caption:
          "|f| = 15 cm is locked (f = −15 cm). Read u, v and m at each stop and write down the nature of the image before looking at the table below.",
      },
    },
    {
      type: "table",
      headers: ["Object (concave, $|f| = 15$)", "Image position", "Nature", "Size"],
      rows: [
        ["beyond C ($|u| > 30$)", "between F and C", "real, inverted", "diminished"],
        ["at C ($|u| = 30$)", "at C", "real, inverted", "same size ($m = -1$)"],
        ["between C and F", "beyond C", "real, inverted", "magnified"],
        ["at F ($|u| = 15$)", "at infinity", "(rays leave parallel)", "—"],
        ["inside F ($|u| < 15$)", "behind the mirror", "virtual, erect", "magnified"],
      ],
    },
    {
      type: "text",
      content:
        "What you should have seen: as the object comes in from far away, the real image moves out from F towards infinity and grows; it passes the object at C. The moment the object crosses F, the image jumps to the far side, becomes upright and sits behind the mirror. You do not need to memorise this table: one line of the formula regenerates any row.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "convex-mirror",
        objectDistance: { min: 5, max: 60, step: 1, initial: 30 },
        focalLength: { min: 15, max: 15, step: 1, initial: 15 },
        caption:
          "Convex mirror, f = +15 cm. Drag the object anywhere: v stays positive and smaller than f, and m stays between 0 and 1.",
      },
    },
    {
      type: "text",
      content:
        "The whole story of $v$ against $u$ fits on one graph. Measure distances in units of $|f|$ and take a concave mirror, $f = -1$. Solving the mirror formula gives $v = \\frac{uf}{u - f} = \\frac{-u}{u + 1}$. Drag the point along the curve from $u = -6$ towards 0.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "-x/(x+1)",
        exprLatex: "v = \\frac{uf}{u - f},\\ f = -1",
        window: { xmin: -6, xmax: 0, ymin: -8, ymax: 8 },
        initial: -3,
        excluded: [-1],
      },
    },
    {
      type: "text",
      content:
        "The graph has a vertical asymptote at $u = -1$ (object at F, image at infinity) and a horizontal one at $v = -1$ (object at infinity, image at F). The point $(-2, -2)$ is the object at C imaged onto itself. For $-1 < u < 0$ the curve jumps to positive $v$: the virtual images.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** An object is 30 cm in front of a concave mirror of radius 40 cm. Find the image.\n\n1. Signs: $u = -30$ cm, $R = -40$ cm, so $f = -20$ cm. *Why this step:* the formula is only as right as the signs you feed it.\n2. $\\frac1v = \\frac1f - \\frac1u = -\\frac1{20} + \\frac1{30} = \\frac{-3 + 2}{60} = -\\frac1{60}$, so $v = -60$ cm.\n3. $m = -\\frac vu = -\\frac{-60}{-30} = -2$.\n4. Read the signs: real (in front, $v < 0$), inverted ($m < 0$), twice as tall. It is the \"between C and F\" row, as it should be.\n\n**Worked example 2.** A convex mirror has $f = 20$ cm. An object is 20 cm in front.\n\n1. $u = -20$ cm, $f = +20$ cm.\n2. $\\frac1v = \\frac1{20} + \\frac1{20} = \\frac1{10}$, so $v = +10$ cm: 10 cm behind the mirror.\n3. $m = -\\frac{10}{-20} = +0.5$: virtual, erect, half size.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a shaving mirror).** A concave mirror of focal length 15 cm is held 10 cm from a face.\n\n1. $u = -10$, $f = -15$. $\\frac1v = -\\frac1{15} + \\frac1{10} = \\frac{-2 + 3}{30} = \\frac1{30}$, so $v = +30$ cm.\n2. $m = -\\frac{30}{-10} = +3$: virtual, erect, three times larger, 30 cm behind the mirror. *Why this step:* a positive $v$ is the formula's way of saying \"behind the mirror, so virtual\".\n\n**Worked example 4 (velocity of the image, JEE Main).** Differentiate the mirror formula with respect to time, with $f$ fixed:",
    },
    {
      type: "math",
      latex:
        "-\\frac{1}{v^2}\\frac{dv}{dt} - \\frac{1}{u^2}\\frac{du}{dt} = 0 \\;\\Longrightarrow\\; \\frac{dv}{dt} = -\\frac{v^2}{u^2}\\frac{du}{dt} = -m^2\\,\\frac{du}{dt}",
    },
    {
      type: "text",
      content:
        "The object in Worked example 1 ($u = -30$ cm, $f = -20$ cm, $m = -2$) moves towards the mirror at 2 cm/s.\n\n1. Moving towards the mirror means $u$ goes from $-30$ towards 0, so $\\frac{du}{dt} = +2$ cm/s. *Why this step:* the velocity must carry the same sign convention as the positions.\n2. $\\frac{dv}{dt} = -(-2)^2(2) = -8$ cm/s.\n3. $v$ is becoming more negative: the image races **away** from the mirror at 8 cm/s. That matches the table: as the object approaches F, the image heads off to infinity.\n4. Motion perpendicular to the axis is different: with $u$ fixed, heights scale as $h' = mh$, so the image's transverse velocity is $m$ times the object's ($-2$ times here: twice as fast, in the opposite direction).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a concave mirror always forms a real image\"",
      content:
        "Only while the object is beyond F. Inside F, $\\frac1v = \\frac1f - \\frac1u$ comes out positive and the image is virtual, erect and magnified. That is how a shaving or make-up mirror works.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"magnification greater than 1 means the image is real\"",
      content:
        "Size and reality are separate questions. $|m|$ tells you size; the **sign** of $m$ (or of $v$) tells you nature. For a single mirror, $m < 0$ goes with real and inverted, $m > 0$ with virtual and erect. The shaving mirror gives $m = +3$: magnified and virtual.",
    },
    {
      type: "quiz",
      id: "omp0-3-q1",
      variant: "practice",
      question: "An object is 15 cm in front of a concave mirror of focal length 10 cm. Where is the image, and what is $m$?",
      options: [
        { text: "$v = -30$ cm, $m = -2$", correct: true, feedback: "$\\frac1v = -\\frac1{10} + \\frac1{15} = -\\frac1{30}$; $m = -\\frac{-30}{-15} = -2$. Real, inverted, magnified." },
        { text: "$v = +30$ cm, $m = +2$", feedback: "A sign slip: with $f = -10$ and $u = -15$, $\\frac1v$ comes out negative." },
        { text: "$v = -6$ cm, $m = -0.4$", feedback: "That is $\\frac1v = \\frac1f + \\frac1u$ with both negative. Solve for $\\frac1v = \\frac1f - \\frac1u$." },
        { text: "$v = +6$ cm, $m = +0.4$", feedback: "You used $f = +10$ (a convex mirror's sign) and added. A concave mirror has $f < 0$." },
      ],
      hint: "$u = -15$, $f = -10$, and $\\frac1v = \\frac1f - \\frac1u$.",
    },
    {
      type: "quiz",
      id: "omp0-3-q2",
      variant: "practice",
      question: "A concave mirror of focal length 20 cm forms an image of an object placed 10 cm in front of it. Describe the image.",
      options: [
        { text: "Real, inverted, 20 cm in front, $m = -2$", feedback: "Check the sign of $\\frac1v = -\\frac1{20} + \\frac1{10} = +\\frac1{20}$. A positive $v$ is behind the mirror." },
        { text: "Virtual, erect, 20 cm behind, $m = +2$", correct: true, feedback: "$v = +20$ cm and $m = -\\frac{20}{-10} = +2$. The object is inside F." },
        { text: "Virtual, erect, 6.7 cm behind, $m = +0.67$", feedback: "That is a convex mirror's result. Recheck the sign of $f$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-3-q3",
      variant: "practice",
      question: "An object is 30 cm in front of a convex mirror of focal length 15 cm. Find $v$ and $m$.",
      options: [
        { text: "$v = +30$ cm, $m = +1$", feedback: "That would need $\\frac1v = \\frac1{15} - \\frac1{30}$; the formula gives $\\frac1v = \\frac1f - \\frac1u = \\frac1{15} + \\frac1{30}$." },
        { text: "$v = -10$ cm, $m = -\\frac13$", feedback: "A convex mirror never gives a real image of a real object; $v$ must be positive." },
        { text: "$v = +10$ cm, $m = +\\frac13$", correct: true, feedback: "$\\frac1v = \\frac1{15} + \\frac1{30} = \\frac1{10}$ and $m = -\\frac{10}{-30}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-3-q4",
      variant: "concept",
      question: "A single mirror gives $m = +3$. What can you say about the image?",
      options: [
        { text: "Virtual, erect and magnified; the mirror must be concave", correct: true, feedback: "Only a concave mirror with the object inside F magnifies an erect image." },
        { text: "Real and magnified", feedback: "For one mirror, positive $m$ means erect, and erect goes with virtual." },
        { text: "Virtual and erect; the mirror must be convex", feedback: "A convex mirror always has $0 < m < 1$. It never magnifies." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-3-q5",
      variant: "practice",
      question: "An object at $u = -40$ cm moves towards a concave mirror of focal length 20 cm at 3 cm/s. What is the velocity of the image at that instant?",
      options: [
        { text: "3 cm/s towards the mirror", feedback: "The image and object move in opposite directions along the axis here; the minus sign in $-m^2$ matters." },
        { text: "12 cm/s away from the mirror", feedback: "At C, $|m| = 1$, so the speeds are equal. $m^2 = 4$ would be for $m = -2$." },
        { text: "3 cm/s away from the mirror", correct: true, feedback: "$v = -40$ cm, $m = -1$, $\\frac{dv}{dt} = -m^2\\frac{du}{dt} = -3$ cm/s, so the image moves to more negative $v$: away." },
      ],
      hint: "First find $v$ and $m$ at $u = -40$, $f = -20$.",
    },
    {
      type: "quiz",
      id: "omp0-3-q6",
      variant: "concept",
      question: "Which mirror can form a real image one-third the size of a real object?",
      options: [
        { text: "Only a convex mirror", feedback: "A convex mirror does diminish, but its images of real objects are always virtual." },
        { text: "A plane mirror", feedback: "A plane mirror gives a virtual image of the same size." },
        { text: "Only a concave mirror", correct: true, feedback: "A real image needs converging reflected rays. A concave mirror with the object beyond C gives a diminished real image." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "refraction-and-snells-law",
  title: "0.4 · Refraction and Snell's Law",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stand a straw in a glass of water and it looks snapped at the surface. The straw is straight; the light coming from its lower half changes direction as it leaves the water. That change of direction at a boundary is **refraction**, and it happens because light travels at different speeds in different materials.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Refractive index",
      content:
        "The (absolute) refractive index of a medium is $n = \\dfrac{c}{v}$, the speed of light in vacuum divided by its speed in the medium. Air $\\approx 1.00$, water $\\approx 1.33 = \\frac43$, glass $\\approx 1.5$, diamond $\\approx 2.42$.\nThe **relative** index of medium 2 with respect to medium 1 is $n_{21} = \\dfrac{n_2}{n_1} = \\dfrac{v_1}{v_2}$. A larger $n$ is called **optically denser** (slower light), whatever the material's mass density.",
    },
    {
      type: "text",
      content:
        "**Why a speed change bends light: the marching band.** A row of marchers walks at an angle from a paved road onto mud, where everyone slows down. The end of the row that reaches the mud first slows first while the other end is still striding along the road. The row swings round, and the band's direction of march turns **towards the normal** to the edge of the mud. Leaving the mud, the reverse happens and they swing away from the normal. The full version of this argument, with wavefronts, is Huygens' construction in 2.1; the result is:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Snell's law",
      content:
        "$n_1\\sin i = n_2\\sin r$, with both angles measured from the **normal**.\nThe incident ray, the refracted ray and the normal lie in one plane. Going into a denser medium ($n_2 > n_1$), $r < i$: the ray bends towards the normal. Going into a rarer medium, it bends away. At normal incidence, $i = 0$ gives $r = 0$: no bending at all.",
    },
    {
      type: "text",
      content:
        "**Frequency is fixed, wavelength is not.** The source sets how many wave crests arrive at the boundary per second, and crests cannot pile up or vanish there, so the frequency $\\nu$ is the same on both sides. Since $v = \\nu\\lambda$ and $v$ drops by a factor $n$, the wavelength drops by the same factor:",
    },
    { type: "math", latex: "\\lambda_{\\text{medium}} = \\frac{v}{\\nu} = \\frac{c/n}{\\nu} = \\frac{\\lambda_{\\text{vacuum}}}{n}" },
    {
      type: "text",
      content:
        "Colour is tied to frequency, which is why red light stays red underwater even though its wavelength has shrunk.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "refraction",
        n1: { min: 1, max: 1, step: 0.01, initial: 1 },
        n2: { min: 1, max: 2.5, step: 0.01, initial: 1.5 },
        incidence: { min: 0, max: 89, step: 1, initial: 40 },
        caption:
          "Air on top (n₁ = 1 locked), a denser medium below. Raise n₂ and watch the refracted ray swing towards the normal; a faint reflected ray always comes back too.",
      },
    },
    {
      type: "text",
      content:
        "Now reverse the trip: light starts in glass and goes out into air.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "refraction",
        n1: { min: 1.5, max: 1.5, step: 0.01, initial: 1.5 },
        n2: { min: 1, max: 1, step: 0.01, initial: 1 },
        incidence: { min: 0, max: 89, step: 1, initial: 30 },
        caption:
          "Glass (n₁ = 1.5) on top, air below. The ray now bends away from the normal. Push the incidence above about 42° and see what happens (the subject of 0.6).",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: into the denser medium, $r$ is always smaller than $i$, and the bigger $n_2$ the stronger the bend. From glass into air, $r$ is bigger than $i$, and $r$ reaches $90^\\circ$ at about $42^\\circ$ incidence; beyond that no refracted ray appears at all.",
    },
    {
      type: "text",
      content:
        "**Lateral shift through a glass slab.** A ray enters a parallel-sided slab of thickness $t$ at incidence $i$ and refracts to $r$. At the far face it meets the same pair of indices in reverse, so by Snell it leaves at angle $i$ again: the **emergent ray is parallel to the incident ray**, only shifted sideways. Inside the slab the ray travels a length $L = \\dfrac{t}{\\cos r}$ (hypotenuse of the right triangle with side $t$). The original line of the ray and the path inside make angle $i - r$, so the perpendicular gap between the incident line and the emergent ray is",
    },
    { type: "math", latex: "d = L\\sin(i - r) = \\frac{t\\,\\sin(i - r)}{\\cos r}" },
    {
      type: "text",
      content:
        "**Worked example 1 (angle of refraction).** Light in air meets glass of $n = \\sqrt2$ at $45^\\circ$.\n\n1. Snell: $1 \\cdot \\sin 45^\\circ = \\sqrt2\\sin r$. *Why this step:* air is $n_1 = 1$, glass is $n_2$.\n2. $\\sin r = \\frac{1/\\sqrt2}{\\sqrt2} = \\frac12$, so $r = 30^\\circ$. Towards the normal, as expected.\n\n**Worked example 2 (lateral shift, JEE Main).** A slab of thickness 6 cm and $n = \\sqrt3$; incidence $60^\\circ$.\n\n1. $\\sin r = \\frac{\\sin 60^\\circ}{\\sqrt3} = \\frac{\\sqrt3/2}{\\sqrt3} = \\frac12$, so $r = 30^\\circ$.\n2. $d = \\frac{6\\sin(60^\\circ - 30^\\circ)}{\\cos 30^\\circ} = \\frac{6 \\times \\frac12}{\\frac{\\sqrt3}2} = \\frac{6}{\\sqrt3} = 2\\sqrt3 \\approx 3.46$ cm. *Why this step:* the shift uses the angle between the undeviated line and the actual path, $i - r$, not $i$ itself.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (what changes and what does not).** Light of wavelength 600 nm in air enters water ($n = \\frac43$). Find its frequency, speed and wavelength in water.\n\n1. Frequency in air: $\\nu = \\frac{c}{\\lambda} = \\frac{3\\times10^8}{600\\times10^{-9}} = 5\\times10^{14}$ Hz. It stays the same in water. *Why this step:* frequency is set by the source.\n2. Speed: $v = \\frac cn = \\frac{3\\times10^8}{4/3} = 2.25\\times10^8$ m/s.\n3. Wavelength: $\\lambda_w = \\frac{600}{4/3} = 450$ nm. Check: $\\nu\\lambda_w = 5\\times10^{14} \\times 450\\times10^{-9} = 2.25\\times10^8$ m/s. ✓\n\n**Worked example 4 (between two media).** A ray in water ($n = \\frac43$) meets a glass plate ($n = \\frac32$) at $30^\\circ$.\n\n1. $\\frac43\\sin 30^\\circ = \\frac32\\sin r$, so $\\sin r = \\frac{(4/3)(1/2)}{3/2} = \\frac{2/3}{3/2} = \\frac49$.\n2. $r = \\sin^{-1}\\frac49 \\approx 26.4^\\circ$. Only a small bend, because the relative index $n_{gw} = \\frac{3/2}{4/3} = \\frac98$ is close to 1. *Why this step:* bending depends on the **ratio** of indices, not on each index alone.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"light always bends towards the normal\"",
      content:
        "Only when it enters a **denser** medium. Going from water or glass into air it bends away from the normal, which is exactly why the straw looks bent upwards and why pools look shallow (0.5).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the frequency changes in the new medium\"",
      content:
        "Speed and wavelength change by the factor $n$; frequency does not change at all. Anything that depends on frequency (colour, photon energy $h\\nu$ in Chapter 3) is the same inside the glass as outside.",
    },
    {
      type: "quiz",
      id: "omp0-4-q1",
      variant: "practice",
      question: "Light travels at $2\\times10^8$ m/s in a glass. What is the refractive index of the glass? ($c = 3\\times10^8$ m/s)",
      options: [
        { text: "0.67", feedback: "That is $v/c$. The index compares vacuum speed to medium speed, so it is at least 1." },
        { text: "1.5", correct: true, feedback: "$n = c/v = 3/2$." },
        { text: "2", feedback: "2 is the speed in units of $10^8$ m/s, not the index." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-4-q2",
      variant: "practice",
      question: "A ray in air meets a medium of index $\\sqrt3$ at an angle of incidence of $60^\\circ$. What is the angle of refraction?",
      options: [
        { text: "$30^\\circ$", correct: true, feedback: "$\\sin r = \\frac{\\sin 60^\\circ}{\\sqrt3} = \\frac12$." },
        { text: "$60^\\circ$", feedback: "Only normal incidence passes undeviated. At $60^\\circ$ into a denser medium, the ray bends." },
        { text: "$90^\\circ$", feedback: "You multiplied instead of divided: $\\sin r = \\sqrt3\\sin 60^\\circ$ would exceed 1. Here $\\sin r = \\sin i/n$." },
        { text: "$45^\\circ$", feedback: "$\\sin 45^\\circ = 0.707$, but $\\frac{\\sin 60^\\circ}{\\sqrt3} = 0.5$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-4-q3",
      variant: "practice",
      question: "Light of wavelength 500 nm in air enters glass of index 1.5. What are its frequency and wavelength in the glass?",
      options: [
        { text: "$4\\times10^{14}$ Hz and 500 nm", feedback: "That keeps the wavelength and changes the frequency, the wrong way round." },
        { text: "$6\\times10^{14}$ Hz and 750 nm", feedback: "The wavelength shrinks in a denser medium: divide by $n$, do not multiply." },
        { text: "$6\\times10^{14}$ Hz and 333 nm", correct: true, feedback: "$\\nu = c/\\lambda = 6\\times10^{14}$ Hz, unchanged; $\\lambda = 500/1.5 \\approx 333$ nm." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-4-q4",
      variant: "concept",
      question: "A ray passes from glass into air at $20^\\circ$ incidence. Which statement is true?",
      options: [
        { text: "It bends towards the normal, so $r < 20^\\circ$.", feedback: "Towards the normal happens when entering a denser medium. Air is rarer than glass." },
        { text: "It bends away from the normal, so $r > 20^\\circ$.", correct: true, feedback: "$1.5\\sin 20^\\circ = \\sin r$ gives $\\sin r \\approx 0.51$, $r \\approx 31^\\circ$." },
        { text: "It goes straight on because the angle is small.", feedback: "Only $i = 0$ exactly goes straight on." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-4-q5",
      variant: "practice",
      question: "What is the refractive index of glass ($n = \\frac32$) relative to water ($n = \\frac43$)?",
      options: [
        { text: "$\\frac89$", feedback: "That is water relative to glass, $n_w/n_g$." },
        { text: "$2$", feedback: "That multiplies the two indices. A relative index is a ratio." },
        { text: "$\\frac98$", correct: true, feedback: "$n_{gw} = \\frac{n_g}{n_w} = \\frac{3/2}{4/3} = \\frac98$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-4-q6",
      variant: "concept",
      question: "A ray falls on a thick glass slab along the normal. What is its lateral shift?",
      options: [
        { text: "$t(1 - 1/n)$", feedback: "That is the normal shift of an image seen through the slab (0.5), a different quantity." },
        { text: "Zero", correct: true, feedback: "$i = r = 0$, so $\\sin(i - r) = 0$ and $d = 0$." },
        { text: "Equal to the slab thickness", feedback: "A normal ray does not bend at either face, so it is not displaced sideways at all." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "apparent-depth",
  title: "0.5 · Apparent Depth and Normal Shift",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Look down into a clear swimming pool and the bottom seems within easy reach; jump in and it is a metre deeper than you thought. Every year people misjudge rivers and pools this way. The bottom is not where it looks, because the light from it bends away from the normal as it leaves the water. Snell's law with small angles tells us exactly where it seems to be.",
    },
    {
      type: "text",
      content:
        "**Derivation.** An object O lies at depth $d$ below a flat surface, in a medium of index $n_2$. The observer looks from above, in a medium of index $n_1$ (air, $n_1 = 1$, in the usual problem). Follow a ray that leaves O at a small angle $r$ to the vertical and meets the surface at a point A a horizontal distance $x$ from the vertical through O. It refracts to a larger angle $i$ and enters the eye. Traced back, it meets the vertical through O at the image I, at depth $d'$. From the two right triangles,",
    },
    { type: "math", latex: "\\tan r = \\frac{x}{d}, \\qquad \\tan i = \\frac{x}{d'}" },
    {
      type: "text",
      content:
        "Snell at A says $n_2\\sin r = n_1\\sin i$. Near the normal (looking almost straight down), the angles are small and $\\sin\\theta \\approx \\tan\\theta$:",
    },
    {
      type: "math",
      latex:
        "n_2\\,\\frac{x}{d} = n_1\\,\\frac{x}{d'} \\quad\\Longrightarrow\\quad d' = d\\,\\frac{n_1}{n_2}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Apparent depth (near-normal viewing)",
      content:
        "$d' = d\\,\\dfrac{n_{\\text{observer}}}{n_{\\text{object}}}$, measured from the surface.\nFor an object in water seen from air, $d' = \\dfrac{d}{n}$: the object seems **raised** by $d - d' = d\\left(1 - \\dfrac1n\\right)$.\nFor an object in air seen from water, $d' = n\\,d$: it seems **farther** away.",
    },
    {
      type: "text",
      content:
        "Look at the pool from an angle and it looks shallower still. The small-angle step fails then, and the exact image depth depends on the viewing angle. Try it.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "apparent-depth",
        n1: { min: 1, max: 1, step: 0.01, initial: 1 },
        n2: { min: 1.33, max: 1.33, step: 0.01, initial: 1.33 },
        depth: { min: 5, max: 40, step: 1, initial: 20 },
        viewAngle: { min: 0, max: 70, step: 1, initial: 5 },
        caption:
          "An object 20 cm under water (n = 1.33), viewed from air. The tick marked d·n₁/n₂ is the near-normal answer; the image dot is where the rays actually seem to come from at your viewing angle.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: looking almost straight down, the image sits at about 15 cm, right on the $d/n$ mark. Tilt the view to $60^\\circ$ and it rises to about 10 cm. So $d/n$ is the near-normal value, and slant viewing always makes the bottom look even shallower. Changing the real depth scales everything in proportion.",
    },
    {
      type: "text",
      content:
        "**Normal shift through a slab.** Put a glass slab of thickness $t$ and index $n$ on top of a mark and look straight down. Inside the slab the mark appears at depth $t/n$ below the top face instead of $t$, so it seems lifted by",
    },
    { type: "math", latex: "\\Delta = t - \\frac tn = t\\left(1 - \\frac1n\\right)" },
    {
      type: "text",
      content:
        "The shift does not depend on how far the object is below the slab, or on where the observer is: every paraxial ray is displaced by the same amount along the normal. Several slabs stacked together simply add their shifts, and the apparent depth under several layers is the sum of $t_k/n_k$ for each layer (viewed from air).",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the coin).** A coin lies at the bottom of a beaker of water 20 cm deep ($n = \\frac43$). How deep does it look from directly above?\n\n1. Observer in air, object in water: $d' = d\\,\\frac{n_1}{n_2} = 20 \\times \\frac{1}{4/3}$.\n2. $d' = 15$ cm. The coin seems raised by 5 cm. *Why this step:* check with $d(1 - \\frac1n) = 20 \\times \\frac14 = 5$ cm. ✓\n\n**Worked example 2 (two layers).** An ink spot is at the bottom of a 4 cm layer of water ($n = \\frac43$), and a glass slab 3 cm thick ($n = 1.5$) lies on top of the water. How far below the top of the glass does the spot appear?\n\n1. Each layer contributes its thickness divided by its index: glass $\\frac{3}{1.5} = 2$ cm, water $\\frac{4}{4/3} = 3$ cm. *Why this step:* the image formed by the lower surface acts as the object for the next surface up, and each flat surface just rescales depth.\n2. Apparent depth $= 2 + 3 = 5$ cm, against a real depth of 7 cm.\n3. Check with shifts: $3(1 - \\frac23) + 4(1 - \\frac34) = 1 + 1 = 2$ cm, and $7 - 2 = 5$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (measuring $n$ with a microscope, practical exam).** A travelling microscope is focused on a mark on the bench: reading 12.00 cm. A glass slab is placed over the mark; the microscope must be raised to 12.80 cm to see the mark sharply again, and to 14.40 cm to focus on a speck on the top of the slab.\n\n1. Real thickness: $t = 14.40 - 12.00 = 2.40$ cm.\n2. Apparent thickness (top of slab down to the image of the mark): $14.40 - 12.80 = 1.60$ cm.\n3. $n = \\frac{\\text{real}}{\\text{apparent}} = \\frac{2.40}{1.60} = 1.5$. *Why this step:* $d' = d/n$ rearranged. The raise of 0.80 cm is the normal shift, $2.40(1 - \\frac1{1.5}) = 0.80$ cm. ✓\n\n**Worked example 4 (bird and fish, both ways).** A kingfisher hovers 6 m above a pond; a fish is 4 m below the surface ($n = \\frac43$). Viewing is near the vertical.\n\n1. Fish as seen by the bird: object in water, observer in air, $d' = 4 \\times \\frac34 = 3$ m below the surface, so the fish appears $6 + 3 = 9$ m away.\n2. Bird as seen by the fish: object in air, observer in water, $d' = 6 \\times \\frac{4/3}{1} = 8$ m above the surface, so the bird appears $8 + 4 = 12$ m away. *Why this step:* $d' = d\\,\\frac{n_{\\text{observer}}}{n_{\\text{object}}}$ covers both directions; do not memorise \"divide by $n$\".\n3. The two answers differ, and $12 = \\frac43 \\times 9$: each is just the other seen through a different medium.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"apparent depth is always $d/n$ whatever the viewing angle\"",
      content:
        "$d/n$ is the near-normal result, from $\\sin \\approx \\tan$. Viewed at a slant, the image rises further: about 10 cm instead of 15 cm for an object 20 cm under water seen at $60^\\circ$. JEE problems say \"viewed from above\" or \"near normal\" precisely so that $d/n$ applies.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"an object in air viewed from water looks nearer\"",
      content:
        "It looks **farther**. The rule is $d' = d\\,n_{\\text{observer}}/n_{\\text{object}}$: with the observer in the denser medium the ratio exceeds 1. The fish sees the bird at 8 m, not 4.5 m.",
    },
    {
      type: "quiz",
      id: "omp0-5-q1",
      variant: "practice",
      question: "A pebble lies 12 cm below the surface of water ($n = \\frac43$). Viewed from directly above, how deep does it appear?",
      options: [
        { text: "9 cm", correct: true, feedback: "$d' = 12 \\times \\frac34 = 9$ cm." },
        { text: "16 cm", feedback: "You multiplied by $n$. That is the rule for an object in air seen from water." },
        { text: "3 cm", feedback: "3 cm is the shift, $12(1 - \\frac34)$, not the apparent depth." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-5-q2",
      variant: "practice",
      question: "A glass slab 6 cm thick ($n = 1.5$) is placed over a printed dot. By how much does the dot appear to rise?",
      options: [
        { text: "4 cm", feedback: "4 cm is the apparent thickness $t/n$, not the rise." },
        { text: "2 cm", correct: true, feedback: "$\\Delta = 6(1 - \\frac{1}{1.5}) = 6 \\times \\frac13 = 2$ cm." },
        { text: "3 cm", feedback: "That uses $\\Delta = t/2$. The shift is $t(1 - 1/n)$." },
        { text: "It depends on how far the eye is above the slab.", feedback: "For near-normal viewing the shift depends only on $t$ and $n$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-5-q3",
      variant: "practice",
      question: "A bird flies 3 m above a lake ($n = \\frac43$). How high above the surface does it appear to a fish just below the surface, looking up?",
      options: [
        { text: "2.25 m", feedback: "You divided by $n$. The observer is in the denser medium, so the ratio $n_{\\text{obs}}/n_{\\text{obj}}$ is $\\frac43$." },
        { text: "3 m", feedback: "The surface does change the apparent position: the fish looks through a boundary." },
        { text: "4 m", correct: true, feedback: "$d' = 3 \\times \\frac{4/3}{1} = 4$ m: the bird looks farther away." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-5-q4",
      variant: "concept",
      question: "You look into a pool first straight down, then at a steep slant. How does the apparent depth change?",
      options: [
        { text: "It decreases: the bottom looks shallower at a slant.", correct: true, feedback: "The exact image rises as the viewing angle grows, as the bench showed." },
        { text: "It stays $d/n$.", feedback: "$d/n$ is only the near-normal value." },
        { text: "It increases: the bottom looks deeper at a slant.", feedback: "The ray bends more strongly at larger angles, lifting the image further." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-5-q5",
      variant: "practice",
      question: "A 6 cm layer of oil ($n = 1.5$) floats on 10 cm of water ($n = \\frac43$). How deep does a coin at the bottom appear from above?",
      options: [
        { text: "10.7 cm", feedback: "You divided the total depth 16 cm by 1.5. Each layer is rescaled by its own index." },
        { text: "12 cm", feedback: "You divided 16 cm by $\\frac43$. Each layer needs its own index." },
        { text: "4.5 cm", feedback: "4.5 cm is the total shift, $16 - 11.5$." },
        { text: "11.5 cm", correct: true, feedback: "$\\frac{6}{1.5} + \\frac{10}{4/3} = 4 + 7.5 = 11.5$ cm." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "total-internal-reflection",
  title: "0.6 · Total Internal Reflection",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A cut diamond flashes far more brilliantly than a glass copy of the same shape, and an optical fibre carries light round corners for kilometres with hardly any loss. Both rely on something the refraction bench hinted at in 0.4: when light tries to leave a dense medium at too steep an angle, it cannot get out at all, and **all** of it is reflected.",
    },
    {
      type: "text",
      content:
        "**Derivation.** Light goes from a denser medium ($n_1$) into a rarer one ($n_2 < n_1$). Snell gives $\\sin r = \\frac{n_1}{n_2}\\sin i$, and since $\\frac{n_1}{n_2} > 1$, $r$ is always bigger than $i$. As $i$ grows, $r$ reaches $90^\\circ$ first: the refracted ray skims along the surface. That angle of incidence is the **critical angle** $\\theta_c$:",
    },
    {
      type: "math",
      latex: "n_1\\sin\\theta_c = n_2\\sin 90^\\circ \\quad\\Longrightarrow\\quad \\sin\\theta_c = \\frac{n_2}{n_1}",
    },
    {
      type: "text",
      content:
        "For $i > \\theta_c$, Snell would need $\\sin r > 1$, which no angle has. There is no refracted ray, and the reflected ray carries all the energy.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Total internal reflection (TIR)",
      content:
        "TIR happens when **both** conditions hold:\n1. light travels from a denser to a rarer medium ($n_1 > n_2$);\n2. the angle of incidence exceeds the critical angle, $i > \\theta_c$ with $\\sin\\theta_c = \\dfrac{n_2}{n_1}$.\nFrom a medium of index $n$ into air: $\\sin\\theta_c = \\dfrac1n$. Glass ($n = 1.5$): $41.8^\\circ$. Water ($\\frac43$): $48.6^\\circ$. Diamond ($2.42$): $24.4^\\circ$.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "refraction",
        n1: { min: 1.3, max: 2.5, step: 0.01, initial: 1.5 },
        n2: { min: 1, max: 1, step: 0.01, initial: 1 },
        incidence: { min: 0, max: 89, step: 1, initial: 30 },
        caption:
          "Dense medium on top (n₁ adjustable), air below. Push i past the critical angle and the refracted ray vanishes while the reflected ray brightens to full strength. Then raise n₁ and watch θc fall.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: as $i$ rises, the refracted ray swings towards the surface and gets fainter while the reflected ray gets brighter. At $\\theta_c$ ($41.8^\\circ$ for $n_1 = 1.5$) the refracted ray lies along the surface; one degree more and it is gone. Raising $n_1$ to 2.42 drops $\\theta_c$ to about $24^\\circ$, so a much wider cone of rays inside is trapped.",
    },
    {
      type: "text",
      content:
        "**Where TIR is used.**\n- **Diamond's sparkle:** with $\\theta_c \\approx 24.4^\\circ$, most light entering the top of a well-cut stone strikes the back faces beyond $\\theta_c$, is totally reflected several times and leaves through the top.\n- **Totally reflecting prisms:** a $45^\\circ$–$45^\\circ$–$90^\\circ$ glass prism turns light through $90^\\circ$ or $180^\\circ$, because the ray meets the hypotenuse at $45^\\circ > 41.8^\\circ$. Binoculars and periscopes use them instead of silvered mirrors, which absorb a few per cent and tarnish.\n- **Mirage:** on a hot road, air near the tarmac is hotter and rarer. Light from the sky bending down through ever-rarer layers is finally turned back up, and you see a shimmering \"pool\" that is really the sky.\n- **Optical fibres:** a glass core surrounded by a cladding of slightly lower index keeps light bouncing along by TIR.",
    },
    {
      type: "text",
      content:
        "**Derivation: acceptance angle of a fibre.** A ray enters the flat end of a fibre from air at angle $\\alpha$ and refracts to $r$ inside the core (index $n_1$): $\\sin\\alpha = n_1\\sin r$. It then meets the core–cladding wall (index $n_2$) at angle $90^\\circ - r$, and it is trapped only if that angle is at least $\\theta_c$: $\\sin(90^\\circ - r) = \\cos r \\ge \\frac{n_2}{n_1}$. The limiting ray has $\\cos r = \\frac{n_2}{n_1}$, so",
    },
    {
      type: "math",
      latex:
        "\\sin\\alpha_{\\max} = n_1\\sin r = n_1\\sqrt{1 - \\frac{n_2^2}{n_1^2}} = \\sqrt{n_1^2 - n_2^2}",
    },
    {
      type: "text",
      content:
        "**Derivation: the circle of light.** A small lamp sits at depth $h$ in water. Rays reaching the surface at more than $\\theta_c$ from the vertical are totally reflected, so light escapes only through a disc of radius $R = h\\tan\\theta_c$. With $\\sin\\theta_c = \\frac1n$, $\\cos\\theta_c = \\frac{\\sqrt{n^2 - 1}}{n}$ and $\\tan\\theta_c = \\frac{1}{\\sqrt{n^2 - 1}}$:",
    },
    { type: "math", latex: "R = h\\tan\\theta_c = \\frac{h}{\\sqrt{n^2 - 1}}" },
    {
      type: "text",
      content:
        "**Worked example 1 (critical angle, glass to water).** Light in glass ($n = 1.5$) meets a glass–water boundary ($n = \\frac43$).\n\n1. Denser to rarer? $1.5 > 1.33$, yes, so TIR is possible. *Why this step:* without that, there is no critical angle to find.\n2. $\\sin\\theta_c = \\frac{n_2}{n_1} = \\frac{4/3}{3/2} = \\frac89 \\approx 0.889$, so $\\theta_c \\approx 62.7^\\circ$.\n3. Compared with $41.8^\\circ$ for glass–air, TIR is much harder here because the two indices are close.\n\n**Worked example 2 (the lit circle, JEE Main).** A small bulb is 4 m below the surface of a pool ($n = \\frac43$). Find the radius of the circle through which light leaves.\n\n1. $n^2 - 1 = \\frac{16}{9} - 1 = \\frac79$, so $\\sqrt{n^2 - 1} = \\frac{\\sqrt7}{3}$.\n2. $R = \\frac{4}{\\sqrt7/3} = \\frac{12}{\\sqrt7} \\approx 4.54$ m. *Why this step:* the edge of the disc is where the ray meets the surface exactly at $\\theta_c$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (fibre acceptance).** A fibre has core index 1.3 and cladding index 1.2, in air.\n\n1. $\\sin\\alpha_{\\max} = \\sqrt{1.3^2 - 1.2^2} = \\sqrt{1.69 - 1.44} = \\sqrt{0.25} = 0.5$.\n2. $\\alpha_{\\max} = 30^\\circ$. Rays entering within a $30^\\circ$ cone of the axis are guided; steeper ones leak into the cladding. *Why this step:* the condition at the side wall, not the entry face, decides whether the ray is trapped.\n\n**Worked example 4 (totally reflecting prism).** What is the least index for which a right-angled isosceles prism totally reflects a ray entering one short face normally?\n\n1. The ray goes straight through the first face and meets the hypotenuse at $45^\\circ$.\n2. Need $45^\\circ \\ge \\theta_c$, i.e. $\\sin\\theta_c = \\frac1n \\le \\sin 45^\\circ = \\frac{1}{\\sqrt2}$.\n3. So $n \\ge \\sqrt2 \\approx 1.414$. Ordinary glass (1.5) qualifies.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"TIR can happen going from air into glass\"",
      content:
        "Entering a denser medium, $\\sin r = \\frac{n_1}{n_2}\\sin i$ with $\\frac{n_1}{n_2} < 1$, so $\\sin r$ is always less than 1 and a refracted ray always exists. TIR needs light **inside** the denser medium heading out.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"at the critical angle all light is already reflected\"",
      content:
        "At exactly $\\theta_c$ the refracted ray grazes along the surface (with vanishing intensity). Total reflection is for $i > \\theta_c$. Questions that say \"just at the critical angle\" expect the grazing ray, $r = 90^\\circ$.",
    },
    {
      type: "quiz",
      id: "omp0-6-q1",
      variant: "practice",
      question: "What is the critical angle for a medium of refractive index 2 in air?",
      options: [
        { text: "$60^\\circ$", feedback: "$\\cos 60^\\circ = \\frac12$, but the condition is on the sine: $\\sin\\theta_c = \\frac1n$." },
        { text: "$63.4^\\circ$", feedback: "That is $\\tan^{-1}2$, which is Brewster's angle (2.7), not the critical angle." },
        { text: "$30^\\circ$", correct: true, feedback: "$\\sin\\theta_c = \\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-6-q2",
      variant: "concept",
      question: "In which case can total internal reflection occur?",
      options: [
        { text: "Light going from air into water at $80^\\circ$", feedback: "Rarer into denser: a refracted ray always exists." },
        { text: "Light going from glass into air at $50^\\circ$", correct: true, feedback: "Denser to rarer, and $50^\\circ > 41.8^\\circ$." },
        { text: "Light going from glass into air at $30^\\circ$", feedback: "Denser to rarer, but $30^\\circ$ is below the critical angle of $41.8^\\circ$." },
        { text: "Light going from water into glass at $70^\\circ$", feedback: "Water is rarer than glass, so the ray enters the glass and bends towards the normal." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-6-q3",
      variant: "practice",
      question: "The critical angle for a medium in air is $45^\\circ$. What is its refractive index?",
      options: [
        { text: "$\\sqrt2$", correct: true, feedback: "$n = \\frac{1}{\\sin 45^\\circ} = \\sqrt2$." },
        { text: "$\\frac{1}{\\sqrt2}$", feedback: "That is $\\sin\\theta_c$ itself. The index is its reciprocal." },
        { text: "$1$", feedback: "That is $\\tan 45^\\circ$. The condition uses the sine." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-6-q4",
      variant: "practice",
      question: "A small bulb is $\\sqrt7 \\approx 2.65$ m below the surface of water ($n = \\frac43$). What is the radius of the bright circle on the surface?",
      options: [
        { text: "$\\sqrt7$ m", feedback: "That would need $\\theta_c = 45^\\circ$. For water, $\\tan\\theta_c = \\frac{3}{\\sqrt7}$." },
        { text: "$\\frac73 \\approx 2.33$ m", feedback: "You used $\\tan\\theta_c = \\frac{\\sqrt7}{3}$, which is $\\cot\\theta_c$." },
        { text: "3.53 m", feedback: "That is $h \\times \\frac43$. The radius is $h\\tan\\theta_c$." },
        { text: "3 m", correct: true, feedback: "$R = \\frac{h}{\\sqrt{n^2 - 1}} = \\frac{\\sqrt7}{\\sqrt7/3} = 3$ m." },
      ],
      hint: "$\\sin\\theta_c = \\frac34$; find $\\tan\\theta_c$.",
    },
    {
      type: "quiz",
      id: "omp0-6-q5",
      variant: "practice",
      question: "An optical fibre has core index 1.5 and cladding index 1.2. What is the sine of its maximum acceptance angle in air?",
      options: [
        { text: "0.8", feedback: "0.8 is $\\sin\\theta_c = n_2/n_1$ at the core–cladding wall, not the acceptance at the entry face." },
        { text: "0.9", correct: true, feedback: "$\\sqrt{1.5^2 - 1.2^2} = \\sqrt{2.25 - 1.44} = \\sqrt{0.81} = 0.9$." },
        { text: "0.3", feedback: "You subtracted the indices, $1.5 - 1.2$. The result is $\\sqrt{n_1^2 - n_2^2}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-6-q6",
      variant: "concept",
      question: "A ray inside glass meets the glass–air surface exactly at the critical angle. What happens?",
      options: [
        { text: "All the light is reflected; nothing reaches the surface.", feedback: "Total reflection sets in only for $i > \\theta_c$." },
        { text: "The ray passes straight through undeviated.", feedback: "Only normal incidence passes undeviated." },
        { text: "The refracted ray grazes along the surface, $r = 90^\\circ$.", correct: true, feedback: "That is the definition of the critical angle." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "refraction-at-spherical-surfaces",
  title: "0.7 · Refraction at a Spherical Surface",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "A goldfish in a round bowl looks fatter than it is, and a glass marble held close to print makes the letters swim into view upside down. Both are refraction at a **curved** boundary. One formula handles every such surface, and it is the building block for lenses in Chapter 1: a lens is just two of these surfaces back to back.",
    },
    {
      type: "text",
      content:
        "**Set-up.** A spherical surface with pole P and centre of curvature C separates medium $n_1$ (where the light starts, on the left) from $n_2$. A point object O on the axis sends a ray to a point M on the surface at small height $h$; it refracts and crosses the axis at the image I. The normal at M is the radius CM. Let the ray OM, the radius CM and the refracted ray MI make small angles $\\alpha$, $\\gamma$ and $\\beta$ with the axis:",
    },
    {
      type: "math",
      latex: "\\alpha \\approx \\frac{h}{OP}, \\qquad \\gamma \\approx \\frac{h}{PC}, \\qquad \\beta \\approx \\frac{h}{PI}",
    },
    {
      type: "text",
      content:
        "**Angles at M.** In triangle OMC, the angle of incidence $i$ (between OM extended and the normal CM) is an exterior angle, so $i = \\alpha + \\gamma$. In triangle MCI, $\\gamma$ is the exterior angle, so $\\gamma = r + \\beta$, i.e. $r = \\gamma - \\beta$. Snell with small angles, $n_1 i = n_2 r$, gives",
    },
    {
      type: "math",
      latex:
        "n_1(\\alpha + \\gamma) = n_2(\\gamma - \\beta) \\;\\Longrightarrow\\; \\frac{n_1}{OP} + \\frac{n_2}{PI} = \\frac{n_2 - n_1}{PC}",
    },
    {
      type: "text",
      content:
        "Now the signs. O is to the left: $OP = -u$. I and C are to the right: $PI = v$, $PC = R$. Substituting:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Refraction at a spherical surface",
      content:
        "$\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}$, with $n_1$ the medium the light comes **from** and $n_2$ the medium it goes **into**.\n$R$ is positive when C lies on the side the light goes into (to the right of P), negative when C is on the incident side.\nLateral magnification: $m = \\dfrac{h'}{h} = \\dfrac{n_1 v}{n_2 u}$.",
    },
    {
      type: "text",
      content:
        "The magnification comes from the ray aimed at C, which crosses the surface along the normal without bending: similar triangles through C, combined with Snell for the ray to P, give $m = \\frac{n_1 v}{n_2 u}$. When $n_1 = n_2$ it reduces to $\\frac vu$, which is the lens result you will meet in 1.2.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Two consistency checks",
      content:
        "**Flat surface.** Let $R \\to \\infty$: $\\frac{n_2}{v} = \\frac{n_1}{u}$, so $v = u\\,\\frac{n_2}{n_1}$. An object at depth $d$ in water ($n_1 = \\frac43$) seen from air ($n_2 = 1$) has $v = -\\frac34 d$: apparent depth from 0.5, recovered. ✓\n**Mirror.** Put $n_2 = -n_1$ (reflection reverses the light's direction): $-\\frac{n_1}{v} - \\frac{n_1}{u} = \\frac{-2n_1}{R}$, i.e. $\\frac1v + \\frac1u = \\frac2R$, the mirror formula. A curious trick, not something to rely on in an exam.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a convex glass surface).** An object in air is 20 cm in front of a convex glass surface, $|R| = 10$ cm, $n = 1.5$.\n\n1. Signs: $n_1 = 1$, $n_2 = 1.5$, $u = -20$ cm. The surface bulges towards the object, so C is inside the glass, on the far side: $R = +10$ cm. *Why this step:* the sign of $R$ is fixed by where C is, measured along the incident light.\n2. $\\frac{1.5}{v} = \\frac{n_2 - n_1}{R} + \\frac{n_1}{u} = \\frac{0.5}{10} - \\frac{1}{20} = 0.05 - 0.05 = 0$.\n3. $v = \\infty$: the refracted rays are **parallel**. The object is at this surface's first focal point, $f_1 = -\\frac{n_1 R}{n_2 - n_1} = -20$ cm.\n4. Move the object back to 40 cm: $\\frac{1.5}{v} = 0.05 - 0.025 = 0.025$, so $v = 60$ cm inside the glass, and $m = \\frac{n_1 v}{n_2 u} = \\frac{1 \\times 60}{1.5 \\times (-40)} = -1$: real, inverted, same size.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (the fish bowl, JEE Main).** A fish is 10 cm from the near wall of a spherical bowl of radius 15 cm filled with water ($n = \\frac43$). Where does an observer outside, looking along the diameter through that wall, see it? Ignore the thin glass.\n\n1. Light goes from the fish (water, $n_1 = \\frac43$) into air ($n_2 = 1$). Draw it travelling left to right: fish on the left, wall at P. *Why this step:* fixing the direction of light fixes every sign.\n2. $u = -10$ cm. The centre of the bowl is inside the water, on the incident side: $R = -15$ cm.\n3. $\\frac{1}{v} = \\frac{n_2 - n_1}{R} + \\frac{n_1}{u} = \\frac{-1/3}{-15} + \\frac{4/3}{-10} = \\frac{1}{45} - \\frac{2}{15} = \\frac{1 - 6}{45} = -\\frac19$.\n4. $v = -9$ cm: a virtual image 9 cm inside the bowl, 1 cm nearer the wall than the fish.\n5. $m = \\frac{n_1 v}{n_2 u} = \\frac{(4/3)(-9)}{1 \\times (-10)} = 1.2$: erect and 20% bigger. That is the fat goldfish.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (fish at the centre).** Same bowl, fish at the centre: $u = -15$ cm, $R = -15$ cm.\n\n1. $\\frac1v = \\frac{1}{45} + \\frac{4/3}{-15} = \\frac{1}{45} - \\frac{4}{45} = -\\frac{3}{45} = -\\frac1{15}$, so $v = -15$ cm: the image is at the centre.\n2. $m = \\frac{(4/3)(-15)}{1 \\times (-15)} = \\frac43 = n$. *Why this step:* every ray from C meets the surface along a radius (the normal) and is not bent, so the image must be at C; only its size changes.\n\n**Worked example 4 (a mark on a glass sphere).** A small mark on the surface of a glass sphere ($n = 1.5$, radius 10 cm) is viewed through the sphere from the diametrically opposite side.\n\n1. Light starts at the mark and crosses the glass to the far surface: $u = -20$ cm, $n_1 = 1.5$, $n_2 = 1$. The centre is on the incident side: $R = -10$ cm.\n2. $\\frac1v = \\frac{1 - 1.5}{-10} + \\frac{1.5}{-20} = 0.05 - 0.075 = -0.025$, so $v = -40$ cm.\n3. The image is virtual, 40 cm behind the viewing surface, i.e. 20 cm beyond the mark itself, with $m = \\frac{1.5 \\times (-40)}{1 \\times (-20)} = 3$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the sign of $R$ is decided by whether the surface looks convex\"",
      content:
        "A surface is convex from one side and concave from the other. The sign of $R$ comes only from **where C lies relative to P, measured along the incident light**: C on the side the light goes into, $R > 0$; C on the side it comes from, $R < 0$. The fish-bowl wall is convex to the observer outside, yet $R = -15$ cm because light travels from inside out.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the formula needs $n_1 < n_2$\"",
      content:
        "It works both ways, provided $n_1$ is always the medium the light is **leaving**. In the fish bowl and the glass sphere, $n_1 > n_2$ and the formula gave the right answers without any change.",
    },
    {
      type: "quiz",
      id: "omp0-7-q1",
      variant: "concept",
      question: "Light in air strikes a glass surface that is hollowed out (concave as seen from the air). What is the sign of $R$?",
      options: [
        { text: "Positive, because the glass is on the far side", feedback: "What matters is where the centre of curvature is. For a hollow facing the light, C is in the air." },
        { text: "Negative, because C is on the incident (air) side", correct: true, feedback: "C lies against the direction of the incident light, so $R < 0$." },
        { text: "It depends on the object distance.", feedback: "$R$ is a property of the surface and the light's direction, not of the object." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-7-q2",
      variant: "practice",
      question: "An object in air is 30 cm from a convex glass surface ($R = +10$ cm, $n = 1.5$). Where is the image?",
      options: [
        { text: "90 cm inside the glass", correct: true, feedback: "$\\frac{1.5}{v} = \\frac{0.5}{10} - \\frac1{30} = \\frac1{60}$, so $v = 90$ cm." },
        { text: "60 cm inside the glass", feedback: "That is $\\frac1v = \\frac1{60}$; you forgot the $n_2 = 1.5$ on the left: $v = \\frac{1.5}{1/60}$." },
        { text: "30 cm inside the glass", feedback: "Check $\\frac{n_2 - n_1}{R} + \\frac{n_1}{u} = 0.05 - 0.0333$." },
        { text: "90 cm in front of the surface (virtual)", feedback: "$v$ comes out positive, so the image is on the far side, real." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-7-q3",
      variant: "concept",
      question: "A fish is at the centre of a spherical water-filled bowl. Where does an outside observer see it?",
      options: [
        { text: "Nearer the wall, at $R/n$ from it", feedback: "That applies apparent-depth thinking to a curved surface. Rays from C are all normal to the wall." },
        { text: "At the centre, magnified by $n$", correct: true, feedback: "Rays from C cross the wall along radii and do not bend; $m = \\frac{n_1 v}{n_2 u} = n$." },
        { text: "At the centre, same size", feedback: "The position is right but $m = \\frac{n_1 v}{n_2 u} = \\frac43$, not 1." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-7-q4",
      variant: "concept",
      question: "What does the single-surface formula become when $R \\to \\infty$?",
      options: [
        { text: "The mirror formula", feedback: "That needs $n_2 = -n_1$, not a flat surface." },
        { text: "Snell's law with $i = r$", feedback: "The formula already assumes Snell; letting $R \\to \\infty$ gives image positions, not angles." },
        { text: "The apparent-depth relation $v = u\\,\\frac{n_2}{n_1}$", correct: true, feedback: "A flat surface: $\\frac{n_2}{v} = \\frac{n_1}{u}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-7-q5",
      variant: "practice",
      question: "An object in air 40 cm from a convex glass surface ($R = +10$ cm, $n = 1.5$) forms an image at $v = 60$ cm. What is the magnification?",
      options: [
        { text: "$-1$", correct: true, feedback: "$m = \\frac{n_1 v}{n_2 u} = \\frac{60}{1.5 \\times (-40)} = -1$." },
        { text: "$-1.5$", feedback: "That is $\\frac vu$ without the index ratio $\\frac{n_1}{n_2}$." },
        { text: "$+1$", feedback: "$u$ is negative and $v$ positive, so $m$ is negative: inverted." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.8 · Chapter 0 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question below can be rebuilt from $r = i$, $n_1\\sin i = n_2\\sin r$ and the New Cartesian sign convention (incident light left to right, distances from the pole, along the light positive).",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in eight lines",
      content:
        "1. Plane mirror: $v = -u$, virtual, erect, laterally inverted; rotating the mirror by $\\theta$ turns the ray by $2\\theta$; $H/2$ is enough.\n2. Inclined mirrors: $m = 360^\\circ/\\theta$ gives $m - 1$ images (even $m$, or odd $m$ on the bisector), else $m$.\n3. Spherical mirrors: $f = R/2$ for paraxial rays; concave $f < 0$, convex $f > 0$.\n4. $\\frac1v + \\frac1u = \\frac1f$, $m = -\\frac vu$; image velocity $\\dot v = -m^2\\dot u$.\n5. $n = c/v$, $n_1\\sin i = n_2\\sin r$, frequency fixed, $\\lambda \\to \\lambda/n$; slab shift $\\frac{t\\sin(i - r)}{\\cos r}$.\n6. Apparent depth $d' = d\\,n_{\\text{obs}}/n_{\\text{obj}}$; slab normal shift $t(1 - 1/n)$, shifts add.\n7. TIR: denser to rarer and $i > \\theta_c$, $\\sin\\theta_c = n_2/n_1$; lit circle $R = h/\\sqrt{n^2 - 1}$.\n8. Curved surface: $\\frac{n_2}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R}$, $m = \\frac{n_1 v}{n_2 u}$.",
    },
    {
      type: "quiz",
      id: "omp0-8-q1",
      variant: "mastery",
      question: "Two plane mirrors are inclined at $45^\\circ$. How many images of an object between them are formed?",
      options: [
        { text: "8", feedback: "$360/45 = 8$ is $m$, but for even $m$ two images coincide: $m - 1$." },
        { text: "9", feedback: "The number of images never exceeds $360^\\circ/\\theta$." },
        { text: "7", correct: true, feedback: "$m = 8$ is even, so $8 - 1 = 7$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q2",
      variant: "mastery",
      question: "A light spot reflected from a galvanometer mirror moves across a scale. If the coil turns by $12^\\circ$, through what angle does the reflected beam turn?",
      options: [
        { text: "$12^\\circ$", feedback: "The normal turns by $12^\\circ$; the reflected ray turns by twice that." },
        { text: "$6^\\circ$", feedback: "The factor is 2 the other way: the ray turns more than the mirror." },
        { text: "$24^\\circ$", correct: true, feedback: "Rotating the mirror by $\\theta$ turns the reflected ray by $2\\theta$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q3",
      variant: "mastery",
      question: "An object is 25 cm in front of a concave mirror of focal length 20 cm. Without a ray table, describe the image.",
      options: [
        { text: "Virtual, erect, 100 cm behind, 4 times larger", feedback: "The object is beyond F (25 > 20), so $v$ comes out negative: real." },
        { text: "Real, inverted, 100 cm in front, 4 times larger", correct: true, feedback: "$\\frac1v = -\\frac1{20} + \\frac1{25} = -\\frac1{100}$, $v = -100$ cm, $m = -\\frac{-100}{-25} = -4$." },
        { text: "Real, inverted, 11.1 cm in front, diminished", feedback: "That is $\\frac1v = \\frac1f + \\frac1u$. Solve for $\\frac1v = \\frac1f - \\frac1u$." },
        { text: "Real, inverted, 100 cm in front, 4 times smaller", feedback: "$|m| = |v/u| = 100/25 = 4$: bigger, not smaller." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q4",
      variant: "mastery",
      question: "A convex mirror of focal length 30 cm forms an image one-third the size of the object. How far is the object from the mirror?",
      options: [
        { text: "60 cm", correct: true, feedback: "$m = +\\frac13 = -\\frac vu$ gives $v = -\\frac u3$; then $-\\frac3u + \\frac1u = \\frac1{30}$, so $u = -60$ cm. Check: $v = +20$ cm." },
        { text: "90 cm", feedback: "Try it: $u = -90$ gives $\\frac1v = \\frac1{30} + \\frac1{90} = \\frac4{90}$, $v = 22.5$, $m = \\frac14$." },
        { text: "20 cm", feedback: "20 cm is the image distance, behind the mirror." },
        { text: "The mirror cannot do this; a convex mirror always gives $m = 1$.", feedback: "Only a plane mirror has $m = 1$. A convex mirror always diminishes." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q5",
      variant: "mastery",
      question: "An object 30 cm in front of a concave mirror of focal length 10 cm moves towards the mirror at 4 cm/s. What is the image velocity at that instant?",
      options: [
        { text: "1 cm/s, towards the mirror", feedback: "$\\dot u = +4$ and $\\dot v = -m^2 \\dot u < 0$. A negative velocity here moves the image away from P." },
        { text: "16 cm/s, away from the mirror", feedback: "That uses $m^2 = 4$. Here $m = -\\frac vu = -\\frac12$." },
        { text: "4 cm/s, away from the mirror", feedback: "Equal speeds need $|m| = 1$ (object at C). Here the object is beyond C." },
        { text: "1 cm/s, away from the mirror", correct: true, feedback: "$v = -15$ cm, $m = -\\frac12$, $\\dot v = -m^2\\dot u = -\\frac14 \\times 4 = -1$ cm/s: towards more negative $v$, away." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q6",
      variant: "mastery",
      question: "A ray meets a glass slab of thickness $3\\sqrt3$ cm and index $\\sqrt3$ at $60^\\circ$. What is the lateral shift?",
      options: [
        { text: "$\\frac{3\\sqrt3}{2}$ cm", feedback: "You left out the path length $t/\\cos r$: the shift is $L\\sin(i - r)$ with $L = t/\\cos r$." },
        { text: "3 cm", correct: true, feedback: "$r = 30^\\circ$ and $d = \\frac{3\\sqrt3\\sin 30^\\circ}{\\cos 30^\\circ} = \\frac{3\\sqrt3 \\times \\frac12}{\\frac{\\sqrt3}{2}} = 3$ cm." },
        { text: "$3\\sqrt3$ cm", feedback: "That uses $\\sin i$ instead of $\\sin(i - r)$." },
        { text: "$3\\sqrt3 - 3 \\approx 2.2$ cm", feedback: "That is the normal shift $t(1 - 1/n)$ of an image seen through the slab, not the sideways shift of an oblique ray." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q7",
      variant: "mastery",
      question: "A tank holds 12 cm of water ($n = \\frac43$) with 9 cm of oil ($n = 1.5$) floating on it. How deep does a mark on the bottom appear, viewed from above?",
      options: [
        { text: "14 cm", feedback: "You divided the total 21 cm by 1.5. Each layer is scaled by its own index." },
        { text: "6 cm", feedback: "6 cm is the total shift, $21 - 15$." },
        { text: "15 cm", correct: true, feedback: "$\\frac{9}{1.5} + \\frac{12}{4/3} = 6 + 9 = 15$ cm." },
        { text: "15.75 cm", feedback: "You divided the total 21 cm by $\\frac43$." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q8",
      variant: "mastery",
      question: "A point source is 6 cm below the surface of a liquid of index $\\frac54$. What is the radius of the circle through which light escapes?",
      options: [
        { text: "4.5 cm", feedback: "You used $\\cot\\theta_c = \\frac34$ instead of $\\tan\\theta_c$." },
        { text: "7.5 cm", feedback: "That is $h \\times n$. The radius is $h\\tan\\theta_c = \\frac{h}{\\sqrt{n^2 - 1}}$." },
        { text: "10 cm", feedback: "That is $h/\\cos\\theta_c$, the slant length to the edge of the disc." },
        { text: "8 cm", correct: true, feedback: "$\\sin\\theta_c = 0.8$, $\\tan\\theta_c = \\frac43$, $R = 6 \\times \\frac43 = 8$ cm." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q9",
      variant: "mastery",
      question: "A ray in glass ($n = 1.5$) strikes a glass–water boundary ($n = \\frac43$) at $65^\\circ$. What happens?",
      options: [
        { text: "It is totally reflected, since $\\theta_c \\approx 62.7^\\circ < 65^\\circ$.", correct: true, feedback: "$\\sin\\theta_c = \\frac{4/3}{3/2} = \\frac89$." },
        { text: "It refracts into the water, since $65^\\circ$ is below $90^\\circ$.", feedback: "Beyond $\\theta_c$ there is no angle $r$ with $\\sin r = \\frac{n_1}{n_2}\\sin i$." },
        { text: "It is totally reflected, since $65^\\circ > 41.8^\\circ$.", feedback: "The conclusion is right but the critical angle is wrong: $41.8^\\circ$ is for glass–air." },
        { text: "It refracts, since TIR is impossible into a liquid.", feedback: "TIR only needs a rarer second medium; water is rarer than glass." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q10",
      variant: "mastery",
      question: "A kingfisher is 6 m above a pond ($n = \\frac43$) and a fish is 4 m below the surface, on the same vertical. How far away does the fish appear to the bird?",
      options: [
        { text: "12 m", feedback: "12 m is the distance at which the **bird** appears to the fish ($6 \\times \\frac43 + 4$)." },
        { text: "9 m", correct: true, feedback: "The fish appears at $4 \\times \\frac34 = 3$ m below the surface: $6 + 3 = 9$ m." },
        { text: "10 m", feedback: "10 m is the real distance. The fish is seen through the water surface." },
        { text: "11.3 m", feedback: "You multiplied the depth by $\\frac43$. Seen from air, depths shrink." },
      ],
    },
    {
      type: "quiz",
      id: "omp0-8-q11",
      variant: "mastery",
      question: "A parallel beam falls on a glass sphere ($n = 1.5$, radius 10 cm). Where does it come to a focus? (JEE Advanced style: two surfaces in turn.)",
      options: [
        { text: "10 cm beyond the back surface", feedback: "That is the first surface alone. The converging rays refract again leaving the glass." },
        { text: "15 cm beyond the back surface", feedback: "15 cm is measured from the **centre** ($\\frac{nR}{2(n - 1)}$), which is 5 cm past the back surface." },
        { text: "5 cm beyond the back surface", correct: true, feedback: "First surface: $\\frac{1.5}{v} = \\frac{0.5}{10}$, $v = 30$ cm (10 cm past the back). Second: $u = +10$, $R = -10$, $\\frac1v = \\frac{-0.5}{-10} + \\frac{1.5}{10} = 0.2$, $v = 5$ cm." },
        { text: "At the back surface", feedback: "That would need $n = 2$. For $n = 1.5$ the first surface alone focuses 10 cm past the back." },
      ],
      hint: "The image of the first surface is a (virtual) object for the second, 10 cm beyond it. Take $R = -10$ cm for the exit surface.",
    },
    {
      type: "quiz",
      id: "omp0-8-q12",
      variant: "mastery",
      question: "A concave mirror of focal length 20 cm lies face up at the bottom of a tank of water ($n = \\frac43$) 20 cm deep. A small object is held 30 cm above the water surface on the mirror's axis. Where is the final image formed by light that reflects and comes back out? (JEE Advanced style.)",
      options: [
        { text: "7.5 cm above the water surface", correct: true, feedback: "Entry: object appears $30 \\times \\frac43 = 40$ cm above the surface, 60 cm from the mirror. Mirror: $\\frac1v = -\\frac1{20} + \\frac1{60}$, $v = -30$ cm, i.e. 10 cm above the surface. Exit: the converging light meets the surface first; $v = 10 \\times \\frac34 = 7.5$ cm above it." },
        { text: "10 cm above the water surface", feedback: "You skipped one of the two refractions at the surface (either the way in or the way out); both must be done." },
        { text: "13.3 cm above the water surface", feedback: "On the way out you multiplied by $\\frac43$. Light leaving water bends away from the normal, so converging rays meet sooner: multiply by $\\frac34$." },
        { text: "Behind the mirror (virtual)", feedback: "The apparent object is 60 cm from the mirror, beyond C (40 cm), so the mirror forms a real image in front." },
      ],
      hint: "Refraction in, reflection, refraction out: three steps, each image the next object. The mirror formula does not care that it is under water.",
    },
  ]),
};

export const ompChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
