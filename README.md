# LinkBasedGame

# First, an acknowledgement.  This does not work.
# The intent:
#   Space transition as normal.
#   Search is an additional button in locations.
#   On pressing Search, the game should toggle a location specifc boolean, then reload the scene.
#   On being loaded, a searchable scene has two states - unsearched, which has the Search button,
#   and searched, which includes an additional bit of text.
#   In one location, this would turn up a key.
#   In two others, it turns up clues for the puzzle - a combination lock.
#   The combination lock would be a special scene with different choice handling.
#   It would have 10 buttons representing a keypad, one button to enter the combination, and one button to leave.
#   The code would be 0451 this time, but later keypads could have others, so that would be in the .json.
#   Unlocking the combination lock would reveal a keyhole for the key.
#
# The mechanism:
#   All three additions make use of variables that needed to be preserved across scenes.
#   It took embarassingly long for me to work out passing the variables between scenes.
#   All scenes would need to pass around several variables:
#       1. The state of the keypad
#       2. The state of the key
#       3 - 6. The search state of the four sides of the room
#   For Searching and the Key, that would be the bulk of the task.
#   They could be implemented with a simple if-else display.
#   Keypad is tricky.  It needs a pile of variables all it's own - 
#       1. The current input
#       2. The correct input
#       3. The location the keypad was accessed from (to go back to)
#       4. All the other variables
#   Additionally, it needs its own handleChoice, because it's not changing locations normally.
#
# While I'll continue to tinker with this, I must admit defeat in terms of this assignment.
# I came to necessary realizations too late, and did not reach out for assistance.