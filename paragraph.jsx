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
            originators: document.getElementById('message').value,
            
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
            
            // Growth habit (radio)
            growth: getRadioValue('growth'),
            
            // Leaf properties
            leafColor: document.getElementById('leafColor').value,
            leafLength: document.getElementById('leafLength').value,
            leafWidth: document.getElementById('leafWidth').value,
            petioleLength: document.getElementById('petioleLength').value,
            
            // Leaf characteristics (radio)
            tip: getRadioValue('tip'),
            base: getRadioValue('base'),
            margin: getRadioValue('margin'),
            indument: getRadioValue('indument'),
            
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
            files: getRadioValue('files'),
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
        let text = '';

        // Opening line - Plant Name, Year, File Number
        const openingParts = [];
        if (data.plantName) openingParts.push(data.plantName);
        if (data.yearSubmittion) openingParts.push(data.yearSubmittion);
        if (data.fileNumber) openingParts.push(`File No. ${data.fileNumber}`);
        
        if (openingParts.length > 0) {
            text += openingParts.join(', ') + '. ';
        }

        // Derivation
        if (data.hybrid || data.seedling || data.mutation) {
            const derivation = [];
            if (data.hybrid) derivation.push('hybrid');
            if (data.seedling) derivation.push('chance seedling selection');
            if (data.mutation) derivation.push('seed or vegetative mutation');
            text += 'Derivation: ' + derivation.join(', ') + '. ';
        }

        // Originators and Location
        if (data.originators) {
            text += 'Hybridized by ' + data.originators;
            const locationParts = [];
            if (data.city) locationParts.push(data.city);
            if (data.state) locationParts.push(data.state);
            if (data.country) locationParts.push(data.country);
            if (locationParts.length > 0) {
                text += ', ' + locationParts.join(', ');
            }
            text += '. ';
        }

        // Dates
        if (data.cross) {
            text += 'Cross was made on ' + formatDate(data.cross) + '. ';
        }
        if (data.planted) {
            text += 'Seeds were planted on ' + formatDate(data.planted) + '. ';
        }
        if (data.flowering) {
            text += 'First flowering was on ' + formatDate(data.flowering) + '. ';
        }

        // Reproduction type
        if (data.sterile || data.fertile || data.trueSeed || data.vegetatively) {
            const reproductionType = [];
            if (data.sterile) reproductionType.push('sterile');
            if (data.fertile) reproductionType.push('fertile');
            if (data.trueSeed) reproductionType.push('true from seed');
            if (data.vegetatively) reproductionType.push('reproducible only vegetatively');
            text += 'This plant is ' + reproductionType.join(', ') + '. ';
        }

        // Growth habit
        if (data.growth) {
            text += 'Growth habit: ' + formatWord(data.growth) + '. ';
        }

        // Leaves
        const leafParts = [];
        if (data.leafColor) leafParts.push(data.leafColor + ' in color');
        if (data.leafLength) leafParts.push(data.leafLength + ' long');
        if (data.leafWidth) leafParts.push(data.leafWidth + ' wide');
        if (data.petioleLength) leafParts.push(data.petioleLength + ' petiole');
        
        const leafCharacteristics = [];
        if (data.tip) leafCharacteristics.push(data.tip + ' tip');
        if (data.base) leafCharacteristics.push(data.base + ' base');
        if (data.margin) leafCharacteristics.push(data.margin + ' margin');
        if (data.indument) leafCharacteristics.push(data.indument);

        if (leafParts.length > 0 || leafCharacteristics.length > 0) {
            text += 'Leaves: ' + leafParts.join(', ');
            if (leafCharacteristics.length > 0) {
                if (leafParts.length > 0) text += '; ';
                text += leafCharacteristics.join(', ');
            }
            text += '. ';
        }

        // Calyx
        const calyxParts = [];
        if (data.calyx) calyxParts.push(formatWord(data.calyx));
        if (data.calyxColor) calyxParts.push(data.calyxColor);
        if (data.calyxLength) calyxParts.push(data.calyxLength + ' long');
        if (data.pedicelLength) calyxParts.push(data.pedicelLength + ' pedicel');
        if (data.flowerNumber) calyxParts.push(data.flowerNumber + ' flowers per axil');

        if (calyxParts.length > 0) {
            text += 'Calyx: ' + calyxParts.join(', ') + '. ';
        }

        // Corolla
        const corollaParts = [];
        if (data.corolla) corollaParts.push(formatWord(data.corolla));
        if (data.corollaColor) corollaParts.push(data.corollaColor);
        if (data.corollaLength) corollaParts.push(data.corollaLength + ' long');
        if (data.corollaDiameter) corollaParts.push(data.corollaDiameter + ' diameter');

        if (corollaParts.length > 0) {
            text += 'Corolla: ' + corollaParts.join(', ') + '. ';
        }

        // Distinguishing characteristics
        if (data.differ) {
            text += 'Distinguishing characteristics: ' + data.differ + '. ';
        }

        // Additional information
        const additionalInfo = [];
        if (data.files) additionalInfo.push('Files attached: ' + formatWord(data.files));
        if (data.awards && data.awards.toLowerCase() !== 'n/a') additionalInfo.push('Awards: ' + data.awards);
        if (data.sources && data.sources.toLowerCase() !== 'n/a') additionalInfo.push('Available from: ' + data.sources);
        if (data.cultivar) additionalInfo.push('Published: ' + data.cultivar);
        if (data.email) additionalInfo.push('Contact: ' + data.email);

        if (additionalInfo.length > 0) {
            text += additionalInfo.join('. ') + '. ';
        }

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