function matOut = prod_impact(num4Want_in)

iterations = 1000000;
pity5 = 0;
pity4 = 0;
pityModifier5 = 0;
pityModifier4 = 0;
numWishesRound = 0;
foursObtained = 0;
desiredFoursObtained = 0;
fivesObtained = 0;
desiredFivesObtained = 0;
wishesDone = 0;
guaranteed = 0;
matOut = zeros(1,8);
guarantee4 = 0;

num4Want = num4Want_in;

for i = 1:iterations

    numWishesRound = 180;
    pity5 = 0;
    pity4 = 0;
    pityModifier5 = 0;
    pityModifier4 = 0;
    %foursObtained = 0; %for reaffirming correct 4* rates
    desiredFoursObtained = 0;
    %fivesObtained = 0; %for reaffirming correct 5* rates
    desiredFivesObtained = 0;
    guaranteed = 0;
    guarantee4 = 0;

    while numWishesRound > 0

        numWishesRound = numWishesRound - 1; %use a wish
        wishesDone = wishesDone + 1; %keeps track of total wishes done
        fourCheck = rand(1,1); %RNG call rarity 4 star
        fiveCheck = rand(1,1); %call 5 star
        if fourCheck <= 0.051 + (0.51 * pityModifier4) && fiveCheck > 0.006 + (0.06 * pityModifier5) %obtained a 4 star, but not a 5 star
            
            y = rand(1,1); %determines character or weapon
            
            if y < 0.5 || guarantee4 == 1 %got a character

                guarantee4 = 0;
                z = rand(1,1);

                if z < (num4Want / 3) %is the character desired

                    desiredFoursObtained = desiredFoursObtained + 1;

                end

            else

                guarantee4 = 1;

            end

            foursObtained = foursObtained + 1;
            pity4 = 0;
            pityModifier4 = 0;
            pity5 = pity5 + 1;

            if pity5 >= 73
                pityModifier5 = pityModifier5 + 1;
            end

        elseif fiveCheck <= 0.006 + (0.06 * pityModifier5) %obtained a 5 star

            y = rand(1,1); %50/50 RNG

            if y < 0.5 || guaranteed == 1 %got a desired

                desiredFivesObtained = desiredFivesObtained + 1;
                guaranteed = 0;

            else

                guaranteed = 1;

            end

            fivesObtained = fivesObtained + 1;
            pity5 = 0;
            pityModifier5 = 0;
            pity4 = pity4 + 1;

            if pity4 >= 8
                pityModifier4 = pityModifier4 + 1;
            end

        else

            pity4 = pity4 + 1;
            pity5 = pity5 + 1;

            if pity4 >= 8
                pityModifier4 = pityModifier4 + 1;
            end

            if pity5 >= 73
                pityModifier5 = pityModifier5 + 1;
            end
        end

        if desiredFivesObtained > 0 %as soon as you get desired 5*, end this round
            
            if desiredFoursObtained > 7 %if above c6
                desiredFoursObtained = 7;
            end

            matOut(desiredFoursObtained + 1) = matOut(desiredFoursObtained + 1) + 1;
            numWishesRound = 0;

        end
    end
end

matOut = matOut ./ iterations;

bar(matOut)

average = matOut(2) + matOut(3)*2 + matOut(4)*3 + matOut(5)*4 + matOut(6)*5 + matOut(7)*6 + matOut(8)*7
hold on
xline(average)
%mooeth = fivesObtained / wishesDone

