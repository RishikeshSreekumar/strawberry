# Permutations: Arranging Things — Explainer Script

- **Course:** Permutations, Combinations & the Binomial Theorem
- **Chapter:** Chapter 1 · Permutations: Arranging Things (id: `pc-1-permutations`)
- **Scene class:** `PcCh1Video` in `videos/scenes/pc-1-permutations.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 850 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner gets every arrangement formula of the chapter from the slot picture plus one move: divide out arrangements that look the same. They derive nPr = n!/(n−r)! from shrinking slots and check it on a listable case. They know that with repetition each slot keeps all n choices, giving n^r, with the base as the choices per slot (so 5 letters into 3 postboxes is 3^5, not 5^3). For identical objects they label the copies, count, and divide by p!q!…, and they never subtract. For a circle they divide by the n rotations to get (n−1)!, and divide by 2 again only when the object can be flipped. They glue items that must be together, use the gaps for items that must be apart, and tell "not all together" apart from "no two together". They find the rank of a word by counting the words that come before it and adding 1.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: slots and first-stage choices = PRIMARY (strawberry red), second kind of object / consonants = SECONDARY (teal), labelled copies A₁ = PRIMARY and A₂ = SECONDARY, results and totals = deep gold `#D19A00`, warnings = PRIMARY with a cross mark, checks = GREEN. Letters sit on rounded white tiles. Slots are rounded rectangles with the number of choices written inside and a caption underneath. Maths uses `MathTex`. Each scene has a small grey lesson header in the top left. Clear the frame with `FadeOut` between scenes.

**TTS note:** Samantha reads a lone capital "A" as the article, so the scene inserts `[[char LTRL]]A[[char NORM]]` wherever the letter A is spoken alone. Symbols are spelled out as words ("n P r", "n factorial", "ten to the power four", "four P three").

---

## Scene 0 — Title card

**Narration:** Chapter one. Permutations: arranging things.

**Visuals:** kicker "Permutations, Combinations & the Binomial Theorem", title "Chapter 1 · Permutations: Arranging Things".

---

## Scene 1 — Hook: the podium (Lesson 1.1)

**Narration:**

- **Beat a:** Eight runners, three medals: gold, silver, bronze. How many different podiums are possible?
- **Beat b:** Draw three slots, one per medal. Gold can go to any of eight runners. Whoever won gold can't also win silver, so silver has seven candidates, and bronze has six. Eight times seven times six: three hundred and thirty six podiums.

**Visuals:**

- **Beat a:** Eight numbered runner discs in a row near the top. Three empty slots below, captioned gold, silver, bronze (gold, grey, amber outlines).
- **Beat b:** "8" drops into the gold slot and one runner disc turns gold; "7" into silver and a second disc turns grey; "6" into bronze. Times signs appear between the slots, then `= 336` in gold on the right.

---

## Scene 2 — Arranging r out of n (Lesson 1.1)

**Narration:**

- **Beat a:** Shrink the problem until you can list it. Four letters, A, B, C, D, and two slots. The slots predict four times three, twelve. And here are all twelve.
- **Beat b:** In general, r slots filled from n different things give n, times n minus one, and so on, down to n minus r plus one. That is the front of n factorial with the tail cut off. Divide out the missing tail and n P r equals n factorial over n minus r factorial.
- **Beat c:** Use the product form to compute, and the factorial form for algebra. Arranging all n things gives n factorial. Arranging none gives one, which is exactly why zero factorial is one.

**Visuals:**

- **Beat a:** Tiles A B C D at the top left, two slots with 4 and 3 inside, `4 \times 3 = 12`. On the right, a 4 by 3 grid of two-letter words (AB AC AD / BA BC BD / CA CB CD / DA DB DC) appears row by row, one row per first letter.
- **Beat b:** Clear. `{}^{n}P_{r} = n(n-1)(n-2)\cdots(n-r+1)` with a brace "r factors". Below it `= \frac{n(n-1)\cdots(n-r+1)\,(n-r)!}{(n-r)!}` and then the boxed `{}^{n}P_{r} = \frac{n!}{(n-r)!}`.
- **Beat c:** Two small cards: `{}^{10}P_{3} = 10\cdot 9\cdot 8 = 720` (compute), and `{}^{n}P_{n} = \frac{n!}{0!} = n!`, `{}^{n}P_{0} = \frac{n!}{n!} = 1`.

---

## Scene 3 — When repetition is allowed (Lesson 1.2)

**Narration:**

- **Beat a:** Now a phone PIN. Using a digit doesn't use it up, so every one of the four slots sees all ten digits. Ten to the power four: ten thousand PINs.
- **Beat b:** In general, n choices in each of r slots gives n to the power r. The base is the choices per slot. The exponent is the number of slots.
- **Beat c:** Careful with this one. Five letters go into three postboxes. Is it five cubed, or three to the power five? Each letter is a slot, and each letter picks one of three boxes. So it's three to the power five: two hundred and forty three.

**Visuals:**

- **Beat a:** Four slots each showing 10, captioned "digit 1" … "digit 4". `10 \times 10 \times 10 \times 10 = 10^4 = 10\,000`.
- **Beat b:** Large `n^{r}` with an arrow to the base labelled "choices per slot" and an arrow to the exponent labelled "number of slots".
- **Beat c:** Five slots captioned "letter 1" … "letter 5", each filled with 3. `5^3` with a red cross; `3^5 = 243` with a green check.

---

## Scene 4 — Identical objects (Lesson 1.3)

**Narration:**

- **Beat a:** How many words can you make from A, A, B? Three factorial is six, but the list shows only three. Where did the others go?
- **Beat b:** Paint the two A's different colours. Now there are six genuinely different arrangements. Wash off the paint, and they collapse in pairs. Every word is counted exactly two factorial times, so divide. Six over two: three.
- **Beat c:** The same move works everywhere. Banana has three A's and two N's: six factorial, over three factorial times two factorial. Sixty. Mississippi gives eleven factorial, over four factorial, four factorial, two factorial: thirty four thousand, six hundred and fifty. The overcount is a factor, so you divide. Never subtract.

**Visuals:**

- **Beat a:** Tiles A A B. `3! = 6`? next to three listed words AAB, ABA, BAA.
- **Beat b:** Six labelled arrangements in three columns of two (A₁ red, A₂ teal): (A₁A₂B, A₂A₁B), (A₁BA₂, A₂BA₁), (BA₁A₂, BA₂A₁). Each column gets a brace "2!" and collapses into one plain word underneath. `\frac{3!}{2!} = 3`.
- **Beat c:** `\text{BANANA: } \frac{6!}{3!\,2!} = 60`, `\text{MISSISSIPPI: } \frac{11!}{4!\,4!\,2!} = 34\,650`, and a card `\text{divide by } p!\,q!\cdots,\ \text{never subtract}`.

---

## Scene 5 — Circular arrangements (Lesson 1.4)

**Narration:**

- **Beat a:** Four friends at a round table. Now rotate everyone one seat. Each person has the same neighbour on the left and the same on the right. Nothing changed. We just started reading at a different chair.
- **Beat b:** A circle can be read from any of its n seats, so the n factorial lines count every circle n times. n factorial over n is n minus one factorial. For four friends: six seatings. Or seat one person first as the reference, and fill the rest like a line.
- **Beat c:** A necklace can also be flipped over, so each arrangement matches its mirror image. Then divide by two as well, for three or more beads. But people at a table can't be flipped: their left and right would swap.

**Visuals:**

- **Beat a:** A table circle with four seats A, B, C, D. The seats rotate a quarter turn together (letters stay upright). Caption "same seating".
- **Beat b:** On the right, the four line readings ABCD, BCDA, CDAB, DABC, bracketed as "1 circle". Then `\frac{n!}{n} = (n-1)!` and `\frac{4!}{4} = 6`.
- **Beat c:** Clear. A bead necklace A B C D next to its mirror A D C B with a double arrow "flip". `\frac{(n-1)!}{2}\ (n \ge 3)` for necklaces; `(n-1)!` for people.

---

## Scene 6 — Together, apart (Lesson 1.5)

**Narration:**

- **Beat a:** Arrange the letters of orange, keeping the vowels O, A, E together. Glue them into one block. Now there are four units: four factorial, twenty four. Then arrange inside the block: three factorial, six. One hundred and forty four.
- **Beat b:** Now no two vowels may touch. Place the consonants first: three factorial ways. They leave four gaps, counting both ends. Drop the three vowels into three different gaps: four P three, twenty four. Six times twenty four: again one hundred and forty four.
- **Beat c:** Not all together is the total minus the glued count: seven hundred and twenty minus one hundred and forty four, five hundred and seventy six. That is a different question from no two together, because two vowels can still touch.

**Visuals:**

- **Beat a:** Tiles O R A N G E (vowels red, consonants teal). Vowels slide together into a rounded box; the row becomes [OAE] R N G. `4! \times 3! = 24 \times 6 = 144`.
- **Beat b:** Consonants R N G spaced out with four gold gap markers. Vowels O, A, E drop into three gaps. `3! \times {}^{4}P_{3} = 6 \times 24 = 144`.
- **Beat c:** `6! - 144 = 576` ("not all together"). The example word O A R N E G with O and A touching; card "not all together ≠ no two together".

---

## Scene 7 — Rank of a word (Lesson 1.6)

**Narration:**

- **Beat a:** Where does mother land, when all its arrangements are listed in dictionary order? Don't list them. Count the words that come before it.
- **Beat b:** The first letter is M. E or H could sit there instead, each followed by five factorial arrangements: two hundred and forty. The second letter is O. Among the unused letters, E and H are smaller: two times four factorial, forty eight. Third, T: E, H and R are smaller. Three times three factorial, eighteen. Fourth, H: only E is smaller, two. After that, nothing.
- **Beat c:** Three hundred and eight words come first, so mother is word number three hundred and nine. Don't forget the plus one.

**Visuals:**

- **Beat a:** Tiles M O T H E R at the top; underneath, "sorted: E H M O R T".
- **Beat b:** A running table, one row per position, with the current tile highlighted: `M: \{E, H\} \to 2 \times 5! = 240`, `O: \{E, H\} \to 2 \times 4! = 48`, `T: \{E, H, R\} \to 3 \times 3! = 18`, `H: \{E\} \to 1 \times 2! = 2`, `E, R: 0`.
- **Beat c:** `240 + 48 + 18 + 2 = 308`, then gold `\text{rank} = 308 + 1 = 309`.

---

## Scene 8 — Recap

**Narration:** Every arrangement problem is slots, plus one move. Shrinking choices give n P r. If repeats are allowed, n to the power r. Identical items: divide by their factorials. Circles: divide out the rotations. Together means glue, apart means gaps. In the next chapter we forget the order, and arrangements become selections.

**Visuals:** A two-column summary card built row by row: "r from n, no repeats" `\frac{n!}{(n-r)!}`; "repeats allowed" `n^r`; "identical items" `\frac{n!}{p!\,q!}`; "round table" `(n-1)!`; "together" glue into a block; "apart" gap method.
