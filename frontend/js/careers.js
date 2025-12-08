// Multi-step form functionality
let currentStep = 1;
const totalSteps = 3;

function updateStepIndicators(step) {
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        const stepNum = index + 1;
        if (stepNum < step) {
            indicator.classList.add('completed');
            indicator.classList.remove('active');
            indicator.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>`;
        } else if (stepNum === step) {
            indicator.classList.add('active');
            indicator.classList.remove('completed');
            indicator.textContent = stepNum;
        } else {
            indicator.classList.remove('active', 'completed');
            indicator.textContent = stepNum;
        }
    });
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show current step
    const currentStepEl = document.getElementById(`step${step}`);
    if (currentStepEl) {
        currentStepEl.classList.remove('hidden');
    }
    
    // Update indicators
    updateStepIndicators(step);
    
    // Scroll to form top
    const form = document.getElementById('applicationForm');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function validateStep(step) {
    let isValid = true;
    const stepEl = document.getElementById(`step${step}`);
    
    if (!stepEl) return true;
    
    const requiredInputs = stepEl.querySelectorAll('[required]');
    
    requiredInputs.forEach(input => {
        clearError(input);
        
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'tel' && !validatePhone(input.value)) {
            showError(input, 'Please enter a valid phone number');
            isValid = false;
        }
    });
    
    return isValid;
}

function nextStep(step) {
    if (validateStep(currentStep)) {
        currentStep = step;
        showStep(step);
        
        if (step === 3) {
            populateReview();
        }
    }
}

function prevStep(step) {
    currentStep = step;
    showStep(step);
}

function populateReview() {
    const reviewContent = document.getElementById('reviewContent');
    if (!reviewContent) return;
    
    const form = document.getElementById('applicationForm');
    const formData = new FormData(form);
    
    // Build review HTML
    let html = `
        <div class="grid sm:grid-cols-2 gap-6">
            <div class="bg-cargo-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-semibold text-cargo-gray-400 uppercase tracking-wide mb-3">Personal Information</h4>
                <div class="space-y-2">
                    <p><span class="font-medium">Name:</span> ${formData.get('first_name')} ${formData.get('last_name')}</p>
                    <p><span class="font-medium">Email:</span> ${formData.get('email')}</p>
                    <p><span class="font-medium">Phone:</span> ${formData.get('phone')}</p>
                    <p><span class="font-medium">Country of Birth:</span> ${formData.get('country_of_birth')}</p>
                    <p><span class="font-medium">Date of Birth:</span> ${formData.get('date_of_birth')}</p>
                </div>
            </div>
            
            <div class="bg-cargo-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-semibold text-cargo-gray-400 uppercase tracking-wide mb-3">Address</h4>
                <div class="space-y-2">
                    <p>${formData.get('address') || 'Not provided'}</p>
                    <p>${formData.get('city') || ''} ${formData.get('state') || ''} ${formData.get('zip_code') || ''}</p>
                </div>
            </div>
        </div>
        
        <div class="bg-cargo-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-cargo-gray-400 uppercase tracking-wide mb-3">Driving Experience</h4>
            <div class="grid sm:grid-cols-3 gap-4">
                <div>
                    <p class="font-medium">Years of Experience</p>
                    <p class="text-cargo-gray-500">${getExperienceLabel(formData.get('years_experience'))}</p>
                </div>
                <div>
                    <p class="font-medium">CDL Class</p>
                    <p class="text-cargo-gray-500">${formData.get('cdl_class') ? `Class ${formData.get('cdl_class')}` : 'Not provided'}</p>
                </div>
                <div>
                    <p class="font-medium">CDL Expiration</p>
                    <p class="text-cargo-gray-500">${formData.get('cdl_expiration') || 'Not provided'}</p>
                </div>
            </div>
        </div>
    `;
    
    if (formData.get('previous_jobs')) {
        html += `
            <div class="bg-cargo-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-semibold text-cargo-gray-400 uppercase tracking-wide mb-3">Previous Employment</h4>
                <p class="whitespace-pre-line text-cargo-gray-600">${formData.get('previous_jobs')}</p>
            </div>
        `;
    }
    
    if (formData.get('message')) {
        html += `
            <div class="bg-cargo-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-semibold text-cargo-gray-400 uppercase tracking-wide mb-3">Additional Information</h4>
                <p class="text-cargo-gray-600">${formData.get('message')}</p>
            </div>
        `;
    }
    
    reviewContent.innerHTML = html;
}

function getExperienceLabel(value) {
    const labels = {
        '0': 'Less than 1 year',
        '1': '1-2 years',
        '3': '3-5 years',
        '5': '5-10 years',
        '10': '10+ years'
    };
    return labels[value] || 'Not provided';
}

// Form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('applicationForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate consent
            const consent = document.getElementById('consent');
            if (!consent.checked) {
                showToast('Please accept the consent to continue', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
                phone: formData.get('phone').replace(/\D/g, ''),
                country_of_birth: formData.get('country_of_birth'),
                date_of_birth: formData.get('date_of_birth'),
                address: formData.get('address') || null,
                city: formData.get('city') || null,
                state: formData.get('state') || null,
                zip_code: formData.get('zip_code') || null,
                years_experience: formData.get('years_experience') ? parseInt(formData.get('years_experience')) : null,
                cdl_class: formData.get('cdl_class') || null,
                cdl_expiration: formData.get('cdl_expiration') || null,
                previous_jobs: formData.get('previous_jobs') || null,
                message: formData.get('message') || null
            };
            
            // Submit button loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
            `;
            submitBtn.disabled = true;
            
            try {
                const response = await fetch('/api/applications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.detail || 'Failed to submit application');
                }
                
                // Show success message
                form.classList.add('hidden');
                document.querySelector('.flex.items-center.justify-center.mb-10')?.classList.add('hidden');
                document.getElementById('successMessage').classList.remove('hidden');
                
                // Scroll to success message
                document.getElementById('successMessage').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
            } catch (error) {
                console.error('Error:', error);
                showToast(error.message || 'Failed to submit application. Please try again.', 'error');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Initialize form
    showStep(1);
});

