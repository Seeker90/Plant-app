document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit');
    const outputDiv = document.getElementById('output');

    submitBtn.addEventListener('click', function() {
        // Get all form values
        const formData = {
            plantName: document.getElementById('plantName').value,
            yearSubmittion: document.getElementById('yearSumbittion').value,
            fileNumber: document.getElementById('fileNumber').value,
            
            // Derivation checkboxes
            hybrid: document.getElementById('hybrid').checked,
            seedling: document.getElementById('seedling').checked,
            mutation: document.getElementById('mutation').checked,
            
            // Originators
            originators: document.getElementById('originators').value,
            
            // Derived plant (for mutations)
            derivedPlant: document.getElementById('derivedPlant').value,
            
            // Location
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            
            // Dates
            cross: document.getElementById('cross').value,
            planted: document.getElementById('planted').value,
            flowering: document.getElementById('flowering').value,
            
            // Reproduction type
            sterile: document.getElementById('sterile').checked,
            fertile: document.getElementById('fertile').checked,
            trueSeed: document.getElementById('trueSeed').checked,
            vegetatively: document.getElementById('vegatatively').checked,
            
            // Shape (radio)
            shape: getRadioValue('shape'),
            
            // Growth habit (radio)
            growth: getRadioValue('growth'),
            
            // Growth habit details
            growth_habit: document.getElementById('growth_habit').value,
            
            // Leaf properties
            leafColor: document.getElementById('leafColor').value,
            leafLength: document.getElementById('leafLength').value,
            leafWidth: document.getElementById('leafWidth').value,
            petioleLength: document.getElementById('petioleLength').value,
            
            // Leaf characteristics (radio)
            tip: getRadioValue('tip'),
            base: getRadioValue('base'),
            margin: getRadioValue('margin'),
            
            // Calyx properties
            calyxColor: document.getElementById('calyxColor').value,
            calyxLength: document.getElementById('calyxLength').value,
            pedicelLength: document.getElementById('pedicelLength').value,
            flowerNumber: document.getElementById('flowerNumber').value,
            calyx: getRadioValue('calyx'),
            
            // Corolla properties
            corollaColor: document.getElementById('corollaColor').value,
            corollaLength: document.getElementById('corollaLength').value,
            corollaDiameter: document.getElementById('corollaDiameter').value,
            corolla: getRadioValue('corolla'),
            
            // Additional info
            differ: document.getElementById('differ').value,
            email: document.getElementById('email').value,
            cultivar: document.getElementById('cultivar').value,
            awards: document.getElementById('awards').value,
            sources: document.getElementById('sources').value
        };

        // Build the paragraph
        const paragraph = generateParagraph(formData);
        
        // Display the paragraph
        displayParagraph(paragraph);
    });

    function getRadioValue(name) {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        return checked ? checked.value : '';
    }

    function generateParagraph(data) {
        // Build exactly as specified in the format
        let text = '';
        
        // plantName, yearSubmittion, fileNumber
        if (data.plantName) text += data.plantName + ", ";
        if (data.yearSubmittion) text += data.yearSubmittion + ", ";
        if (data.fileNumber) text += data.fileNumber + ", ";
        
        // Derivation (Hybrid, Seedling, Mutation)
        const derivationParts = [];
        if (data.hybrid) derivationParts.push('hybrid');
        if (data.seedling) derivationParts.push('chance seedling selection');
        if (data.mutation) derivationParts.push('seed or vegetative mutation');
        if (derivationParts.length > 0) {
            text += derivationParts.join(', ') + ", ";
        }
        
        // by originators
        if (data.originators) text += "by " + data.originators + "; ";
        
        // derived plant (if mutation)
        if (data.derivedPlant) text += "derived from " + data.derivedPlant + ", ";
        
        // city, state, country
        if (data.city) text += data.city + ", ";
        if (data.state) text += data.state + ", ";
        if (data.country) text += data.country + ", ";
        
        // mutationPlant (reproductive type)
        const reproductionType = [];
        if (data.sterile) reproductionType.push('sterile');
        if (data.fertile) reproductionType.push('fertile');
        if (data.trueSeed) reproductionType.push('true from seed');
        if (data.vegetatively) reproductionType.push('reproducible only vegetatively');
        if (reproductionType.length > 0) {
            text += reproductionType.join(', ') + ", ";
        }
        
        // cross made on
        if (data.cross) text += "cross made on " + formatDate(data.cross) + "; ";
        
        // seeds planted on
        if (data.planted) text += "seeds planted on " + formatDate(data.planted) + "; ";
        
        // first flowered on
        if (data.flowering) text += "first flowered on " + formatDate(data.flowering) + "; ";
        
        // derivationSeed (already captured in reproductionType above)
        
        // growth type and growth habit
        if (data.growth) text += data.growth + ", ";
        if (data.growth_habit) text += data.growth_habit + ", ";
        
        // Shape
        if (data.shape) text += data.shape + ", ";
        
        // leafColor
        if (data.leafColor) text += data.leafColor + ", ";
        
        // margin
        if (data.margin) text += "margin " + data.margin + "; ";
        
        // leafLength, leafWidth, petiole
        if (data.leafLength) text += data.leafLength + ", ";
        if (data.leafWidth) text += data.leafWidth + ", ";
        if (data.petioleLength) text += data.petioleLength + " petiole, ";
        
        // tipType with tipType (note: your original had this duplicated)
        if (data.tip) text += data.tip + " with " + data.tip + ", ";
        
        // baseType
        if (data.base) text += data.base + ", ";
        
        // calyx type
        if (data.calyx) text += "calyx " + data.calyx + ", ";
        
        // calyxColor
        if (data.calyxColor) text += data.calyxColor + ", ";
        
        // length of calyx
        if (data.calyxLength) text += "length " + data.calyxLength + ", ";
        
        // length of pedicel
        if (data.pedicelLength) text += "length of pedicel " + data.pedicelLength + ", ";
        
        // number of flowers on the axil
        if (data.flowerNumber) text += "number of flowers on the axil " + data.flowerNumber + ", ";
        
        // Corolla
        text += "Corolla ";
        if (data.corolla) text += data.corolla + ", ";
        if (data.corollaLength) text += data.corollaLength + ", ";
        if (data.corollaDiameter) text += data.corollaDiameter + " wide, ";
        if (data.corollaColor) text += data.corollaColor + ", ";
        
        // distinguishing characteristics
        if (data.differ) text += data.differ;
        
        // Ensure it ends with a period
        if (!text.endsWith('.')) text += ".";
        
        return text.trim();
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function formatWord(word) {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase();
    }

    function displayParagraph(paragraph) {
        // Clear previous output
        outputDiv.innerHTML = '';

        // Create a styled paragraph element
        const paragraphElement = document.createElement('p');
        paragraphElement.id = 'generatedParagraph';
        paragraphElement.className = 'generated-paragraph';
        paragraphElement.textContent = paragraph;

        // Create a container
        const container = document.createElement('div');
        container.className = 'paragraph-container';
        container.appendChild(paragraphElement);

        // Create a copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn btn-info btn-sm mt-3';
        copyBtn.textContent = 'Copy to Clipboard';
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(paragraph).then(function() {
                copyBtn.textContent = 'Copied!';
                setTimeout(function() {
                    copyBtn.textContent = 'Copy to Clipboard';
                }, 2000);
            });
        });

        container.appendChild(copyBtn);
        outputDiv.appendChild(container);

        // Scroll to output
        outputDiv.scrollIntoView({ behavior: 'smooth' });
    }
});