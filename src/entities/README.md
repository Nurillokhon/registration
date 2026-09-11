# Entities

Biznes-obyektlar qatlami (masalan `certificate`, `user`).

Har bir slice quyidagicha tuziladi:

```
entities/certificate/
├── index.ts        # public API — faqat shu fayl orqali import qilinadi
├── api/            # so'rovlar (shared/api dagi `api` instance ustida)
├── model/          # tiplar, store, selektorlar
└── ui/             # obyektni ko'rsatuvchi komponentlar (CertificateCard ...)
```
