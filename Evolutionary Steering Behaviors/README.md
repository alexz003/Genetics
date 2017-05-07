# Evolutionary Steering Behaviors

## About
Using Daniel Shiffmans tutorial, I implement his basic Evolutionary Steering Behaviors and attempt to implement some ML design elements of my own.

## Current Function
v.2) Implemented a communication feature. Communication will search for nearby vehicles that have lived through more generations(fitness level). My idea is that the more children a vehicle and it's children are able to have, the better fitted they are to survive.

v.1) Using a guided steering force, the vehicles develop different percption radii for food and poison to move towards. Ideally, the perception radius for food would be rather large and the perception radius for poison would be short. This way the vehicle can get closer to poison when looking for food and also pick up food that may be close to poison.

## Current Issues
Using a fitness level dictated by generation seems to lead to a pattern of large poison perception ranges. Rather than trusting larger generations, I might try to change the fitness from generation, to time alive. Hopefully, this will give us vehicles that will last longer. Vehicles that live longer are more likely to generate children by nature, so by adjusting ranges based on time alive might offer a better solution. 
