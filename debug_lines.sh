#!/bin/bash

# A simple script to show line numbers
nl -w4 -s' ' /Users/jeremy/Development/hacks/node-mealie/src/services/media.ts | sed -n '40,50p'
echo "---"
nl -w4 -s' ' /Users/jeremy/Development/hacks/node-mealie/src/services/media.ts | sed -n '70,80p'
echo "---"
nl -w4 -s' ' /Users/jeremy/Development/hacks/node-mealie/src/services/media.ts | sed -n '100,120p'
