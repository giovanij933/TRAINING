'use strict';
// TRAINING's exercise guide: for each exercise in the library, the muscles it works (drawn on a body, front and
// back) and one cue for doing it well. A tap on the exercise's name in a workout opens it (infoView in index.html).
// Rows below are name|primary|secondary|cue, with the muscle keys of M. For a stretch the primary muscles are the ones
// it stretches; for cardio, the ones it works hardest. An exercise you add yourself has no guide.
//
// The body outlines are from react-body-highlighter (github.com/GV79/react-body-highlighter), used under its licence:
/*
MIT License

Copyright (c) 2020 GV79

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
window.EXG=(()=>{
  // front and back: [region, polygons] on a 100 × 220 grid
  const BODY={"front":[["chest",["51.8 41.6 51 55.1 58 58 67.8 55.5 70.6 47.3 62 41.6","29.8 46.5 31.4 55.5 40.8 58 48.2 55.1 47.8 42 37.6 42"]],["obliques",["68.6 63.3 67.3 57.1 58.8 59.6 60 64.1 60.4 83.3 65.7 78.8 66.5 69.8","33.9 78.4 33.1 71.8 31 63.3 32.2 57.1 40.8 59.2 39.2 63.3 39.2 83.7"]],["abs",["56.3 59.2 58 64.1 58.4 78 58.4 92.7 56.3 98.4 55.1 104.1 51.4 107.8 51 84.5 50.6 67.3 51 57.1","43.7 58.8 48.6 57.1 49 67.3 48.6 84.5 48.2 107.3 44.5 103.7 40.8 91.4 40.8 78.4 41.2 64.5"]],["biceps",["16.7 68.2 18 71.4 22.9 66.1 29 53.9 27.8 49.4 20.4 55.9","71.4 49.4 70.2 54.7 76.3 66.1 81.6 71.8 82.9 69 78.8 55.5"]],["triceps",["69.4 55.5 69.4 61.6 75.9 72.7 77.6 70.2 75.5 67.3","22.4 69.4 29.8 55.5 29.8 60.8 22.9 73.1"]],["neck",["55.5 23.7 50.6 33.5 50.6 39.2 61.6 40 70.6 44.9 69.4 36.7 63.3 35.1 58.4 30.6","29 44.9 30.2 37.1 36.3 35.1 41.2 30.2 44.5 24.5 49 33.9 48.6 39.2 38 39.6"]],["front-deltoids",["78.4 53.1 79.6 47.8 79.2 41.2 75.9 38 71 36.3 72.2 42.9 71.4 47.3","28.2 47.3 21.2 53.1 20 47.8 20.4 40.8 24.5 37.1 28.6 37.1 26.9 43.3"]],["head",["42.4 2.9 40 11.8 42 19.6 46.1 23.3 49.8 25.3 54.7 22.4 57.6 19.2 59.2 10.2 57.1 2.4 49.8 0"]],["abductors",["52.7 110.2 54.3 124.9 60 110.2 62 100 64.9 94.3 60 92.7 56.7 104.5","47.8 110.6 44.9 125.3 42 115.9 40.4 113.1 39.6 107.3 38 102.4 34.7 93.9 39.6 92.2 41.6 99.2 43.7 105.3"]],["quadriceps",["34.7 98.8 37.1 108.2 37.1 127.8 34.3 137.1 31 132.7 29.4 120 28.2 111.4 29.4 100.8 32.2 94.7","63.3 105.7 64.5 100 66.9 94.7 70.2 101.2 71 111.8 68.2 133.1 65.3 137.6 62.4 128.6 62 111.4","38.8 129.4 38.4 112.2 41.2 118.4 44.5 129.4 42.9 135.1 40 146.1 36.3 146.5 35.5 140","59.6 145.7 55.5 129 60.8 113.9 61.2 130.2 64.1 139.6 62.9 146.5","32.7 138.4 26.5 145.7 25.7 136.7 25.7 127.3 26.9 114.3 29.4 133.5","71.8 113.1 73.9 124.1 73.9 140.4 72.7 145.7 66.5 138.4 70.2 133.5"]],["knees",["33.9 140 34.7 143.3 35.5 147.3 36.3 151 35.1 156.7 29.8 156.7 27.3 152.7 27.3 147.3 30.2 144.1","65.7 140 72.2 147.8 72.2 152.2 69.8 157.1 64.9 156.7 62.9 151"]],["calves",["71.4 160.4 73.5 153.5 76.7 161.2 79.6 167.8 78.4 187.8 79.6 195.5 74.7 195.5","24.9 194.7 27.8 164.9 28.2 160.4 26.1 154.3 24.9 157.6 22.4 161.6 20.8 167.8 22 188.2 20.8 195.5","72.7 195.1 69.8 159.2 65.3 158.4 64.1 162.4 64.1 165.3 65.7 177.1","35.5 158.4 35.9 162.4 35.9 166.9 35.1 172.2 35.1 176.7 32.2 182 30.6 187.3 26.9 194.7 27.3 187.8 28.2 180.4 28.6 175.5 29 169.8 29.8 164.1 30.2 158.8"]],["forearm",["6.1 88.6 10.2 75.1 14.7 70.2 16.3 74.3 19.2 73.5 4.5 97.6 0 100","84.5 69.8 83.3 73.5 80 73.1 95.1 98.4 100 100.4 93.5 89.4 89.8 76.3","77.6 72.2 77.6 77.6 80.4 84.1 85.3 89.8 92.2 101.2 94.7 99.6","6.9 101.2 13.5 90.6 18.8 84.1 21.6 77.1 21.2 71.8 4.9 98.8"]]],"back":[["head",["50.6 0 46 0.9 40.9 5.5 40.4 12.8 45.1 20 55.7 20 59.1 13.6 59.6 4.7 55.7 1.3"]],["trapezius",["44.7 21.7 47.7 21.7 47.2 38.3 47.7 64.7 38.3 53.2 35.3 40.9 31.1 36.6 39.1 33.2 43.8 27.2","52.3 21.7 55.7 21.7 56.6 27.2 60.9 32.8 68.9 36.6 64.7 40.4 61.7 53.2 52.3 64.7 53.2 38.3"]],["back-deltoids",["29.4 37 23 39.1 17.4 44.3 18.3 53.6 24.3 49.4 27.2 46.4","71.1 37 78.3 39.6 82.6 44.7 81.7 53.6 74.9 48.9 72.3 45.1"]],["upper-back",["31.1 38.7 28.1 48.9 28.5 55.3 34 75.3 47.2 71.1 47.2 66.4 36.6 54 33.6 41.3","68.9 38.7 71.9 49.4 71.5 56.2 66 75.3 52.8 71.1 52.8 66.4 63.4 54.5 66.4 41.7"]],["triceps",["26.8 49.8 17.9 55.7 14.5 72.3 16.6 81.7 21.7 63.8 26.8 55.7","73.6 50.2 82.1 55.7 86 73.2 83.4 82.1 77.9 63 73.2 55.7","26.8 58.3 26.8 68.5 23 75.3 19.1 77.4 22.6 65.5","72.8 58.3 77 64.7 80.4 77.4 76.6 75.3 72.8 68.9"]],["lower-back",["47.7 72.8 34.5 77 35.3 83.4 49.4 102.1 46.8 83","52.3 72.8 65.5 77 64.7 83.4 50.6 102.1 53.2 83.8"]],["forearm",["86.4 75.7 91.1 83.4 93.2 94 100 106.4 96.2 104.3 88.1 89.4 84.3 83.8","13.6 75.7 8.9 83.8 6.8 93.6 0 106.4 3.8 104.3 12.3 88.5 15.7 83","81.3 79.6 77.4 77.9 79.1 84.7 91.1 103.8 93.2 108.9 94.5 104.7","18.7 79.6 22.1 77.9 20.9 84.3 9.4 103 6.8 108.5 5.1 104.7"]],["gluteal",["44.7 99.6 30.2 108.5 29.8 118.7 31.5 126 47.2 121.3 49.4 114.9","55.3 99.1 51.1 114.5 52.3 120.9 68.1 126 69.8 119.1 69.4 108.5"]],["adductor",["48.1 123 44.7 123 41.3 125.5 45.1 144.3 48.5 135.7 48.9 129.4","51.9 122.6 55.7 123.4 59.1 126 54.9 144.3 51.9 136.2 51.1 129.4"]],["hamstring",["28.9 122.1 31.1 129.4 36.6 126 35.3 135.3 34.5 150.2 29.4 158.3 28.9 146.8 27.7 141.3 27.2 131.5","71.5 121.7 69.4 128.9 63.8 126 65.5 136.6 66.4 150.2 71.1 158.3 71.5 147.7 72.8 142.1 73.6 131.9","38.7 125.5 44.3 146 40.4 166.8 36.2 152.8 37 135.3","61.7 125.5 63.4 136.2 64.3 153.2 60 166.8 56.2 146.4"]],["knees",["34.5 153.2 31.1 159.1 33.6 166.4 37.4 162.6","66.4 153.6 63 163 66.8 166.4 69.4 159.1"]],["calves",["29.4 160.4 28.5 167.2 24.7 179.6 23.8 192.8 25.5 197 28.5 193.2 29.8 180 31.9 171.1 31.9 166.8","37.4 165.1 35.3 167.7 33.2 171.9 31.1 180.4 30.2 191.9 34 200 38.7 190.6 39.1 168.9","63 165.1 61.3 168.5 61.7 190.6 66.4 199.6 70.6 191.9 68.9 179.6 66.8 170.2","70.6 160.4 72.3 168.5 75.7 179.1 76.6 192.8 74.5 196.6 72.3 193.6 70.6 179.6 68.1 168.1"]],["soleus",["28.5 195.7 30.2 195.7 33.6 201.7 30.6 220 28.5 213.6 26.8 198.3"]],["soleus",["69.8 195.7 71.9 195.7 73.6 198.3 71.9 213.2 70.2 219.6 67.2 202.1"]]]};
  // muscle key: [name shown, regions it lights; "front:" or "back:" for one side only]
  const M={chest:['Chest',['chest']],fdelt:['Front delts',['front-deltoids']],sdelt:['Side delts',['front-deltoids','back-deltoids']],
    rdelt:['Rear delts',['back-deltoids']],tri:['Triceps',['triceps']],bi:['Biceps',['biceps']],fore:['Forearms',['forearm']],
    abs:['Abs',['abs']],obl:['Obliques',['obliques']],traps:['Traps',['trapezius']],lats:['Lats',['upper-back']],
    ub:['Upper back',['upper-back']],lb:['Lower back',['lower-back']],glutes:['Glutes',['gluteal']],quads:['Quads',['quadriceps']],
    hams:['Hamstrings',['hamstring']],add:['Adductors',['adductor']],abd:['Hip abductors',['abductors']],
    calves:['Calves',['calves','soleus']],tib:['Shins',['front:calves']],neck:['Neck',['neck','trapezius']],hipf:['Hip flexors',[]]};
  const T=`
Bench Press|chest|tri fdelt|Shoulder blades pinched, feet planted; lower the bar to mid-chest and press up and slightly back.
Incline Bench Press|chest fdelt|tri|Bench at 30–45°; lower to the upper chest, elbows a little under the bar, and press back up.
Dumbbell Bench Press|chest|tri fdelt|Lower the dumbbells to chest level, elbows about 45° from your sides, then press up and in.
Incline Dumbbell Press|chest fdelt|tri|Bench at 30–45°; lower to the upper chest with a slight elbow tuck and press up over the shoulders.
Close-Grip Bench Press|tri chest|fdelt|Hands about shoulder-width, elbows tucked; touch the lower chest and press with the triceps.
Overhead Press|fdelt sdelt|tri traps abs|Squeeze the glutes and brace; press the bar straight up past your face and finish it over mid-foot.
Seated Dumbbell Press|fdelt sdelt|tri traps|Back on the pad; lower the dumbbells to ear level and press up without arching.
Arnold Press|fdelt sdelt|tri|Start with palms facing you at chin height; turn them forward as you press overhead.
Landmine Press|fdelt chest|tri abs|Press the bar up and forward from the shoulder, ribs down, and let the shoulder blade move with it.
Cable Fly|chest|fdelt|Elbows softly bent and fixed; sweep the handles together in an arc and squeeze the chest.
Pec Deck|chest|fdelt|Elbows at chest height; bring the pads together with the chest and return slowly to a stretch.
Lateral Raise|sdelt|traps|Lead with the elbows, slight bend; raise to shoulder height without shrugging and lower slowly.
Cable Lateral Raise|sdelt|traps|Cable low behind you; raise out to the side to shoulder height and keep tension at the bottom.
Triceps Pushdown|tri||Elbows pinned to your sides; push down until the arms are straight, then let the forearms rise to 90°.
Overhead Triceps Extension|tri||Elbows up and in; lower the weight behind your head for a full stretch, then straighten.
Skull Crusher|tri||Upper arms angled slightly back; lower the bar toward your forehead by bending only the elbows.
Decline Bench Press|chest|tri fdelt|Legs locked in; lower to the lower chest and press straight up.
Machine Chest Press|chest|tri fdelt|Handles at mid-chest; press out without slamming the lockout and return under control.
Floor Press|chest tri|fdelt|Lying on the floor, lower until the upper arms touch, pause, then press.
Machine Shoulder Press|fdelt sdelt|tri|Handles at shoulder height; press up without shrugging, back on the pad.
Push Press|fdelt sdelt|tri quads glutes traps|Dip a few inches at the knees, drive up hard and press the bar overhead as the legs straighten.
Z Press|fdelt sdelt|tri abs ub|Sit on the floor, legs straight; brace hard and press without leaning back.
Dumbbell Fly|chest|fdelt|Soft, fixed elbows; open wide until the chest stretches, then hug the dumbbells back together.
Incline Dumbbell Fly|chest|fdelt|On a 30° incline, open wide with soft elbows and bring the dumbbells together over the upper chest.
Low-to-High Cable Fly|chest|fdelt|Cables low; sweep the handles up and together to face height for the upper chest.
Machine Lateral Raise|sdelt|traps|Pads on the outer arms; raise to shoulder height and lower slowly.
Lean-Away Lateral Raise|sdelt|traps|Hold a post and lean away; raise the dumbbell out to the side through the longer range.
Upright Row|sdelt traps|bi fore|Pull the bar up close to the body, elbows leading, to chest height; stop short if the shoulders pinch.
Front Raise|fdelt|sdelt chest|Raise the weight in front to shoulder height with straight arms, no swinging, and lower slowly.
Rope Pushdown|tri||Elbows fixed; push down and spread the rope ends apart at the bottom.
Dumbbell Kickback|tri||Hinge forward, upper arm level with the floor; straighten the elbow back and squeeze.
JM Press|tri|chest|Close grip; lower the bar toward the chin with the elbows forward, then press back up.
Deadlift|hams glutes lb|quads traps lats fore|Bar over mid-foot; hinge to grip, brace, push the floor away and stand tall without leaning back.
Rack Pull|glutes lb traps|hams lats fore|Bar at knee height; brace, drive the hips through and stand tall.
Barbell Row|lats ub|rdelt bi lb|Hinge to about 45° with a flat back; pull the bar to the lower ribs and lower it under control.
Pendlay Row|lats ub|rdelt bi lb|Back nearly level with the floor; row the bar from a dead stop to the lower chest.
Dumbbell Row|lats|ub rdelt bi|Hand and knee on the bench; pull the dumbbell toward the hip, elbow close to your side.
Seated Cable Row|lats ub|rdelt bi|Sit tall; pull the handle to your stomach, shoulder blades back, and let them reach forward on the return.
Chest-Supported Row|ub lats|rdelt bi|Chest on the pad; row with the elbows and squeeze the shoulder blades together.
T-Bar Row|lats ub|rdelt bi lb|Hinge with a flat back; pull the handles to the chest, pause, lower slowly.
Lat Pulldown|lats|ub bi fore|Lean back slightly; pull the bar to the upper chest by driving the elbows down and back.
Straight-Arm Pulldown|lats|tri abs|Arms nearly straight; sweep the bar down to the thighs with the lats, not the triceps.
Face Pull|rdelt ub|traps|Rope at face height; pull toward your eyes, elbows high, hands finishing beside the ears.
Rear Delt Fly|rdelt|ub traps|Hinge forward; open the arms wide with soft elbows, leading with the elbows, no shrugging.
Shrug|traps||Weight at your sides; lift the shoulders straight up toward the ears, pause, lower.
Barbell Curl|bi|fore|Elbows at your sides; curl the bar up without swinging and lower it slowly.
Dumbbell Curl|bi|fore|Palms up, elbows still; curl and turn the little finger up at the top.
Hammer Curl|bi fore||Palms facing each other; curl without moving the elbows.
Preacher Curl|bi||Arms on the pad; curl up and lower all the way to a nearly straight arm.
Cable Curl|bi|fore|Elbows pinned; curl the handle up and keep tension at the bottom.
Cable Crunch|abs|obl|Kneel holding the rope by your head; crunch the ribs toward the hips, hips still.
Pallof Press|obl abs||Stand side-on to the cable; press the handle straight out and resist the twist.
Cable Woodchop|obl|abs sdelt|Arms long; rotate through the torso from high to low, pivoting the back foot.
Landmine Rotation|obl|abs fdelt|Arms long; sweep the bar from hip to hip by rotating through the torso.
Weighted Decline Sit-up|abs|hipf obl|Weight at the chest; curl up one vertebra at a time and lower slowly.
Meadows Row|lats ub|rdelt bi|Side-on to a landmine, staggered stance; row the end of the bar up toward the hip.
Machine Row|ub lats|rdelt bi|Chest on the pad; pull the handles back and squeeze the shoulder blades.
Seal Row|ub lats|rdelt bi|Face down on a high bench; row the bar up to the bench without lifting the chest.
Single-Arm Cable Row|lats|ub rdelt bi|Reach forward for the stretch, then row the handle toward the hip.
Neutral-Grip Pulldown|lats|ub bi|Palms facing; pull the handle to the upper chest, elbows down and close.
Single-Arm Pulldown|lats|ub bi|Pull the handle down along your side, elbow toward the hip.
Assisted Pull-up|lats|ub bi|Use the assistance for full reps: hang straight, pull the chest toward the bar.
Reverse Pec Deck|rdelt|ub traps|Facing the machine; open the arms wide with straight elbows, squeeze, return slowly.
Dumbbell Shrug|traps||Dumbbells at your sides; shrug straight up, pause, lower.
Y-Raise|traps sdelt|rdelt ub|Face down on an incline; raise light weights up and out in a Y, thumbs up.
EZ-Bar Curl|bi|fore|Grip the angled bar; curl without swinging and lower under control.
Incline Dumbbell Curl|bi|fore|On an incline bench, arms hanging behind you; curl without bringing the elbows forward.
Concentration Curl|bi||Elbow braced on the inner thigh; curl slowly and squeeze at the top.
Spider Curl|bi||Chest on an incline bench, arms hanging straight down; curl up and squeeze.
Reverse Curl|fore bi||Palms down; curl the bar up with straight wrists.
Back Squat|quads glutes|add hams lb|Brace, sit down between your heels with the knees over the toes, and stand up through the whole foot.
Front Squat|quads|glutes ub abs|Elbows high, chest up; squat straight down and drive up keeping the torso upright.
Hack Squat|quads|glutes add|Back on the pad, feet mid-platform; lower deep with control and press through the whole foot.
Leg Press|quads glutes|add hams|Feet shoulder-width; lower until the hips start to tuck, then press without locking the knees.
Romanian Deadlift|hams glutes|lb fore|Soft knees; push the hips back and slide the bar down the thighs until the hamstrings stretch, then stand.
Bulgarian Split Squat|quads glutes|add hams|Rear foot on the bench; drop the back knee straight down and drive up through the front foot.
Walking Lunge|quads glutes|add hams calves|Long step; lower the back knee toward the floor and push through the front heel into the next step.
Goblet Squat|quads glutes|add abs|Weight at the chest; sit down between the heels, elbows inside the knees, and stand tall.
Hip Thrust|glutes|hams quads|Upper back on the bench, chin tucked; drive the hips up until you're straight from knees to shoulders.
Good Morning|hams lb|glutes|Bar on the upper back, soft knees; hinge the hips back with a flat back, then stand.
Leg Extension|quads||Pad above the ankles; straighten the knees fully, pause, lower slowly.
Leg Curl|hams|calves|Face down; curl the pad toward the glutes with the hips pressed down, lower slowly.
Seated Leg Curl|hams|calves|Thigh pad snug; curl the pad down and back, then return slowly.
Adductor Machine|add||Sit tall; squeeze the pads together, then let them open slowly to a stretch.
Standing Calf Raise|calves||Rise as high as you can on the balls of the feet, pause, lower to a full stretch.
Seated Calf Raise|calves||Knees bent under the pad; rise high, pause, lower to a deep stretch.
Smith Machine Squat|quads glutes|add hams|Feet slightly in front of the bar; squat down with control and drive up.
Belt Squat|quads glutes|add|Belt at the hips; squat down tall with no load on the spine, then stand.
Pendulum Squat|quads|glutes add|Back on the pad; sink deep with the knees forward and drive up.
Box Squat|glutes quads|hams add lb|Sit back to the box, pause without relaxing, then drive up.
Single-Leg Romanian Deadlift|hams glutes|lb add|Hinge on one leg, the other reaching back, hips square; stand by squeezing the glute.
Cable Pull-Through|glutes hams|lb|Facing away from the cable; hinge back, then drive the hips forward to stand.
Kettlebell Swing|glutes hams|lb abs sdelt|Hike the bell back, then snap the hips forward to float it to chest height; the arms only guide it.
Reverse Lunge|quads glutes|add hams|Step back and lower the back knee, then drive through the front foot to return.
Split Squat|quads glutes|add hams|Staggered stance; lower straight down until the back knee nearly touches, then stand.
Lateral Lunge|add quads glutes||Step wide to the side and sit back into that hip, other leg straight, then push back.
Abductor Machine|abd glutes||Sit tall; push the pads apart, then return slowly.
Glute Kickback|glutes|hams|Hinge slightly and kick the leg straight back without arching the lower back.
Leg Press Calf Raise|calves||Balls of the feet on the platform edge; press up high, then lower to a stretch.
Donkey Calf Raise|calves||Hinged forward; rise high on the toes and lower to a deep stretch.
Tibialis Raise|tib||Back against a wall, heels down; lift the toes as high as you can and lower slowly.
Dip|chest tri|fdelt|Lean slightly forward; lower until the shoulders are just below the elbows, then press up.
Push-up|chest tri|fdelt abs|Body in one line; lower the chest to just above the floor, elbows about 45°, and press up.
Diamond Push-up|tri chest|fdelt abs|Hands together under the chest; lower with the elbows close and press up.
Pike Push-up|fdelt sdelt|tri traps|Hips high; lower the head toward the floor between the hands and press back up.
Handstand Push-up|fdelt sdelt|tri traps|Against a wall; lower the head to the floor with control and press up.
Deficit Push-up|chest tri|fdelt abs|Hands on raised plates; lower below hand level for a deeper stretch.
Ring Dip|chest tri|fdelt abs|Rings turned out at the top; lower with control and press up, keeping them close.
Bench Dip|tri|chest fdelt|Hands on the bench behind you; lower until the elbows reach 90°, then press up.
Pull-up|lats|ub bi fore|Hang with straight arms; pull the chest toward the bar, elbows down and back, and lower fully.
Chin-up|lats bi|ub fore|Palms facing you; pull the chin over the bar and lower all the way.
Inverted Row|ub lats|rdelt bi abs|Body straight under a bar; pull the chest to the bar and lower.
Hanging Leg Raise|abs|hipf obl fore|Hang still; raise straight legs by curling the pelvis up, lower slowly.
Hanging Knee Raise|abs|hipf fore|Hang still; bring the knees toward the chest and curl the pelvis.
Toes-to-Bar|abs|hipf lats fore|From a hang, raise the toes to the bar with the abs and control the way down.
Ab Wheel Rollout|abs|lats obl|Ribs down; roll out as far as you can without the lower back sagging, then pull back.
Dead Bug|abs|obl hipf|Back flat on the floor; lower the opposite arm and leg slowly, keeping the back down.
Reverse Crunch|abs|obl|Curl the hips off the floor toward the ribs, lower slowly.
Bicycle Crunch|obl abs||Bring each elbow toward the opposite knee as the other leg extends, slowly.
V-Up|abs|hipf obl|Lift arms and legs together to meet in the middle, lower with control.
Wide-Grip Pull-up|lats|ub bi|Wide grip; pull the chest to the bar, elbows down and out.
Band Pull-Apart|rdelt ub|traps|Arms straight in front; pull the band apart to the chest, squeezing the shoulder blades.
Pistol Squat|quads glutes|add calves abs|On one leg, the other straight in front; sit all the way down and stand up.
Nordic Curl|hams||Knees anchored; lower the body forward as slowly as you can, catch yourself, push back.
Jump Squat|quads glutes|calves hams|Squat a little, jump explosively, land softly and go straight into the next.
Step-up|quads glutes|hams calves|Whole foot on the box; drive up through that leg without pushing off the back foot.
Glute Bridge|glutes|hams|On your back, feet flat; drive the hips up and squeeze, lower slowly.
Back Extension|lb glutes|hams|Hinge at the hips over the pad; rise until the body is straight, without overarching.
Cossack Squat|add quads glutes|hams|Wide stance; sit into one hip with the other leg straight, toes up, then switch.
Sissy Squat|quads||Lean back as the knees travel forward over the toes; lower and rise with the quads.
Single-Leg Calf Raise|calves||On one foot on a step; rise high, lower to a full stretch.
Doorway Chest Stretch|chest|fdelt|Forearm on the door frame at shoulder height; step through until the chest opens.
Cross-Body Shoulder Stretch|rdelt|ub|Pull one arm across the chest just above the elbow, shoulder down.
Overhead Triceps Stretch|tri|lats|Reach one hand down your back and gently press the elbow with the other hand.
Sleeper Stretch|rdelt||Lying on your side, arm at 90°; gently press the forearm toward the floor.
Wrist Flexor Stretch|fore||Arm straight, palm up; gently pull the fingers back.
Thread the Needle|ub rdelt|traps|On hands and knees, slide one arm under the other and rest that shoulder down.
Kneeling Lat Stretch|lats|tri|Elbows on a bench; sit the hips back and let the chest sink.
Dead Hang|lats|fore ub|Hang from a bar with relaxed shoulders and breathe.
Child's Pose|lb lats|glutes|Knees wide, sit back on the heels, arms long, and breathe into the back.
Biceps Wall Stretch|bi|chest fdelt|Palm on the wall behind you, arm straight; turn the body away.
Cat-Cow|lb ub|abs|On hands and knees, arch and round the spine in time with the breath.
Upper Back Stretch|ub|rdelt traps|Clasp the hands in front, round the upper back and push the hands away.
Neck Side Bend|neck traps||Tilt the ear toward the shoulder and let the other shoulder drop.
Standing Quad Stretch|quads|hipf|Hold the ankle behind you, knees together, pelvis tucked.
Lying Hamstring Stretch|hams|calves|On your back, raise one straight leg with a strap until you feel the stretch.
Pigeon Pose|glutes|hipf abd|Front shin across the mat, back leg long; fold forward over the front leg.
Kneeling Hip Flexor Stretch|hipf|quads|Half-kneeling; tuck the pelvis and shift forward until the front of the hip stretches.
Butterfly Stretch|add||Soles together, knees out; sit tall and let the knees drop.
90/90 Hip Stretch|glutes abd|add|Both legs at 90°; sit tall and lean over the front shin, then switch.
Wall Calf Stretch|calves||Hands on the wall, back leg straight, heel down; lean in.
Soleus Calf Stretch|calves||As the calf stretch, with the back knee bent and the heel down.
Standing Hamstring Stretch|hams|calves lb|Heel on a low step, leg straight; hinge forward with a flat back.
Figure-Four Stretch|glutes|abd|On your back, ankle over the opposite knee; pull the bottom thigh toward you.
IT Band Stretch|abd|glutes|Cross one leg behind the other and lean the hips out to the side.
Lying Quad Stretch|quads|hipf|On your side, pull the top heel toward the glutes, knees together.
Downward Dog|hams calves|lats sdelt|Hips high, hands pressing the floor; let the heels sink toward the ground.
Seated Forward Fold|hams|lb calves|Legs straight; fold forward from the hips with a long spine.
Neck Rotation|neck|traps|Turn the head slowly to look over each shoulder.
Chin Tuck|neck||Draw the chin straight back into a double chin, hold, release.
Levator Scapulae Stretch|traps neck||Turn the nose toward the armpit and gently pull the head down.
Neck Flexion Stretch|neck traps||Bring the chin toward the chest and let the head hang.
Neck Extension Stretch|neck||Look gently up toward the ceiling without straining.
Scalene Stretch|neck||Tilt the head away and slightly back, holding the shoulder down.
Wall Pec Stretch|chest|fdelt|Arm straight on a wall at shoulder height; turn away until the chest stretches.
Behind-Back Clasp|chest fdelt|bi|Clasp the hands behind you and lift them gently away from the back.
Puppy Pose|lats chest|sdelt|Kneel, walk the hands forward and let the chest sink toward the floor.
Shoulder Dislocates|fdelt chest|rdelt|With a band or stick and a wide grip, circle it from front to back over your head.
Wall Slides|sdelt ub|traps|Back and arms against the wall; slide the arms up and down without losing contact.
Banded Shoulder Distraction|sdelt lats||Band around the wrist; step away and let it gently pull the arm.
Eagle Arms|rdelt ub|traps|Wrap one arm under the other and lift the elbows.
Wrist Extensor Stretch|fore||Arm straight, palm down; gently pull the hand toward you.
Forearm Prayer Stretch|fore||Palms together in front of the chest; lower them until you feel the stretch.
Wrist Circles|fore||Make slow, full circles with the wrists, both ways.
Reverse Prayer Stretch|fore|chest|Backs of the hands together, fingers down; lift the elbows.
Thumb Stretch|fore||Gently pull the thumb back toward the wrist.
Seated Spinal Twist|obl lb|glutes|Sit tall, cross one leg over and rotate toward it from the middle of the back.
Supine Spinal Twist|obl lb|glutes|On your back, drop both knees to one side with the shoulders down.
Cobra Stretch|abs|hipf|Face down; press the chest up with the hips on the floor.
Sphinx Pose|abs lb||On the forearms, lift the chest gently and breathe.
Knees-to-Chest|lb|glutes|On your back, hug both knees to the chest.
Thoracic Extension|ub|lats|Over a foam roller at mid-back; extend back gently, then move the roller up.
Open Book|ub chest|obl|On your side, knees bent; open the top arm to the other side and follow it with your eyes.
Jefferson Curl|hams lb|calves|With a light weight, roll down one vertebra at a time, then roll up.
Prone Press-up|abs lb|hipf|Face down; press the chest up with straight arms, hips staying down.
Couch Stretch|hipf quads||Back knee against the wall, front foot forward; squeeze the glute.
Frog Stretch|add||Knees wide, shins parallel; rock the hips back gently.
Lizard Pose|hipf add|hams|In a low lunge, both hands inside the front foot; let the hips sink.
Happy Baby|add glutes|lb|On your back, hold the feet with the knees wide and let them sink.
Deep Squat Hold|add glutes|calves quads|Sit in a deep squat, heels down, chest tall.
Pancake Stretch|add hams||Legs wide; fold forward from the hips with a long spine.
Adductor Rock-back|add||On all fours with one leg out to the side; rock the hips back.
Standing Forward Fold|hams|lb calves|Hinge and let the upper body hang, knees soft.
Wide-Leg Forward Fold|hams add||Feet wide; fold forward and let the head hang.
Side Lunge Stretch|add|hams|Shift into one bent knee with the other leg straight to the side.
Half-Kneeling Hamstring Stretch|hams|calves|From half-kneeling, straighten the front leg and hinge forward over it.
Kneeling Quad Stretch|quads hipf||Half-kneeling; hold the back foot and gently pull it toward the glute.
Knee-to-Wall Ankle Stretch|calves||Foot a few inches from the wall; drive the knee to the wall with the heel down.
Toe Stretch|calves||Kneel with the toes tucked under and sit back gently.
Ankle Circles|calves tib||Make slow, full circles with each ankle.
Heel Drop Stretch|calves||Balls of the feet on a step; let the heels drop below it.
Tibialis Stretch|tib||Kneel with the tops of the feet on the floor and sit back.
World's Greatest Stretch|hipf hams|ub glutes obl|Lunge with the elbow down inside the front foot, then rotate that arm up to the ceiling.
Spiderman Lunge|hipf add|glutes|Step into a deep lunge with the foot outside the hand and sink the hips.
Inchworm|hams|abs fdelt|Walk the hands out to a plank, then walk the feet up to them.
Leg Swings|hams hipf|add abd|Hold a support; swing one leg forward and back, then side to side.
Arm Circles|sdelt fdelt|rdelt|Controlled circles with straight arms, small to large.
Hip Circles|glutes hipf|add abd|Hands on hips; slow, wide circles both ways.
Walking Knee Hug|glutes|hams hipf|Step and hug one knee to the chest, rising onto the standing toes.
Frankenstein Walk|hams|hipf|Kick a straight leg up toward the opposite hand as you walk.
Torso Twists|obl|lb|Feet planted; rotate the upper body side to side, arms loose.
High Knees|hipf quads|calves abs|Drive the knees up quickly while staying light on the feet.
Scorpion Stretch|hipf abs|obl lb|Face down; reach one foot over toward the opposite hand.
Run|quads hams glutes calves|abs hipf|Tall posture; quick, light steps landing under the hips, shoulders relaxed.
Treadmill|quads hams glutes calves|abs hipf|Run tall without holding the rails; a 1% incline feels closer to outdoors.
Incline Walk|glutes hams calves|quads|Don't hold the rails; take full steps and stay upright.
Walk|quads hams glutes calves||Walk tall with an easy arm swing; a brisk pace counts.
Hike|quads glutes calves|hams|Shorter steps uphill, soft knees downhill.
Bike|quads glutes|hams calves|Seat high enough that the knee stays slightly bent at the bottom; keep a smooth cadence.
Spin Bike|quads glutes|hams calves|Seat at hip height; push and pull through the whole pedal stroke.
Assault Bike|quads glutes|chest lats tri|Push and pull the handles as the legs drive; pace the first half.
Row Erg|lats quads|glutes hams ub bi|Legs, then body, then arms; reverse the order on the way back.
Ski Erg|lats abs|tri ub hams|Pull down from tall, hinging at the hips as the arms drive past the thighs.
Elliptical|quads glutes|hams calves|Stand tall and push through the heels; use the handles lightly.
Stair Climber|glutes quads|calves hams|Stand tall without leaning on the rails; step with the whole foot.
Swim|lats sdelt|tri abs quads|Long body; rotate with each stroke and breathe out into the water.
Jump Rope|calves|quads sdelt fore|Small jumps on the balls of the feet; turn the rope with the wrists.
Sled Push|quads glutes|calves hams chest tri|Arms locked, body at 45°; drive with short, powerful steps.
Cycling|quads glutes|hams calves|Seat high enough that the knee stays slightly bent at the bottom; keep a steady cadence.
Trail Run|quads hams glutes calves|abs add abd|Shorter strides on rough ground; look a few steps ahead.
Hill Sprints|glutes quads hams calves|abs|Lean slightly into the hill and drive the knees and arms; walk down to recover.
Rucking|quads glutes calves|traps ub abs|Pack snug and high; walk tall without leaning forward.
Battle Ropes|sdelt fdelt|fore abs quads|Athletic stance, core braced; make the waves from the shoulders.
Shadow Boxing|sdelt fdelt|obl calves|Light on your feet, hands up; rotate through the hips with each punch.
Heavy Bag|sdelt fdelt obl|chest tri calves|Rotate from the hips, snap each punch back to guard, breathe out as you strike.
VersaClimber|quads glutes lats|calves sdelt|Opposite arm and leg drive together; keep the hips close to the machine.`;
  const G={};
  for(const l of T.trim().split('\n')){const[n,p,s,c]=l.split('|');G[n.toLowerCase()]={p:p.split(' '),s:s?s.split(' '):[],cue:c}}
  const get=name=>G[String(name||'').trim().toLowerCase()]||null;
  const lit=(keys,side,r)=>keys.some(k=>M[k][1].some(x=>x===r||x===side+':'+r));
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
  const fig=(side,g)=>`<svg class="exg-fig" viewBox="0 0 100 220" aria-hidden="true">${BODY[side].map(([r,ps])=>{
    const c=lit(g.p,side,r)?'exg-p':lit(g.s,side,r)?'exg-s':/head|knees/.test(r)?'exg-n':'';
    return ps.map(pt=>`<polygon${c?` class="${c}"`:''} points="${pt}"/>`).join('')}).join('')}</svg>`;
  // the guide: the two figures, what it works and the cue. type: the exercise's kind (W weights, B bodyweight, S stretch,
  // C cardio), which names the lists
  const html=(name,type)=>{
    const g=get(name);if(!g)return '';
    const[a,b]=type==='S'?['Stretches','Also']:type==='C'?['Works','Also']:['Primary','Secondary'];
    const names=ks=>ks.map(k=>M[k][0]).join(', ');
    return `<div class="exg"><div class="exg-figs">${fig('front',g)}${fig('back',g)}</div><dl class="exg-l"><dt>${a}</dt><dd>${esc(names(g.p))}</dd>${
      g.s.length?`<dt>${b}</dt><dd>${esc(names(g.s))}</dd>`:''}<dt>How</dt><dd>${esc(g.cue)}</dd></dl></div>`;
  };
  return {get,html,size:Object.keys(G).length};
})();
