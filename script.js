document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");

  // OPEN PREVIEW
  document.querySelectorAll(".preview-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.preview;
      const container = document.querySelector(`#${id}`);

      if (!container) {
        console.error("Preview container not found:", id);
        return;
      }

      modalBody.innerHTML = container.innerHTML;
      modalTitle.textContent = "Project Preview";
      modal.classList.add("show");
    });
  });

  // CLOSE BUTTON
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    modalBody.innerHTML = "";
  });

  // CLOSE WHEN CLICK BACKDROP
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      modalBody.innerHTML = "";
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tentukan elemen formulir
    const form = document.getElementById('contactForm');
    
    // 2. Tentukan elemen untuk feedback (Anda mungkin perlu menambahkan ini di HTML nanti)
    // Untuk saat ini, kita akan menggunakan alert/console.log
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Mencegah form dikirim secara tradisional

            // Tampilkan pesan loading jika ada elemen yang sesuai
            const sendButton = form.querySelector('button[type="submit"]');
            sendButton.textContent = 'Sending...';
            sendButton.disabled = true;

            const formData = new FormData(form);
            const formAction = form.action;

            try {
                // Mengirim data menggunakan fetch API
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thanks for your message! I will get back to you soon.');
                    form.reset(); // Mengosongkan formulir setelah sukses
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        alert('Error: ' + data.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Oops! There was a problem submitting your form.');
                    }
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('Connection error. Please try again later.');
            } finally {
                // Kembalikan tombol ke keadaan semula
                sendButton.textContent = 'Send';
                sendButton.disabled = false;
            }
        });
    }

    // Skrip Tambahan: Set tahun saat ini untuk footer
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('2025');
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }
});