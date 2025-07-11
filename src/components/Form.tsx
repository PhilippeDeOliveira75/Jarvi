'use client'

import { useState } from 'react'
import { postApplication, fileToBase64 } from '@services/jarviAPI'

export default function Form() {
  const [referenceId, setReferenceId] = useState('')
  const [projectId, setProjectId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddresses, setEmailAddresses] = useState('')
  const [phoneNumbers, setPhoneNumbers] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [historyEntrySubject, setHistoryEntrySubject] = useState('')
  const [historyEntryMessage, setHistoryEntryMessage] = useState('')
  const [location, setLocation] = useState('')
  const [headline, setHeadline] = useState('')
  const [currentCompanyName, setCurrentCompanyName] = useState('')
  const [currentPosition, setCurrentPosition] = useState('')
  const [externalId, setExternalId] = useState('')

  const [cvFile, setCvFile] = useState<File | null>(null)
  const [motivationFile, setMotivationFile] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const resumesFiles = []
      const files = []

      if (cvFile) {
        resumesFiles.push({
          fileName: cvFile.name,
          data: await fileToBase64(cvFile),
        })
      }

      if (motivationFile) {
        files.push({
          fileName: motivationFile.name,
          data: await fileToBase64(motivationFile),
        })
      }

      await postApplication({
        referenceId,
        projectId,
        firstName,
        lastName,
        emailAddresses,
        phoneNumbers,
        linkedinUrl,
        historyEntrySubject,
        historyEntryMessage,
        resumesFiles,
        files,
        externalId,
        location,
        headline,
        currentCompanyName,
        currentPosition,
      })

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg mx-auto bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          POSTULER CHEZ JARVI
        </h1>

        <label className="block font-medium text-gray-700 dark:text-gray-200"> Reference Id </label>
        <input
          type="text"
          value={referenceId}
          onChange={e => setReferenceId(e.target.value)}
          required
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> Project Id </label>
        <input
          type="text"
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> FirstName </label>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> LastName </label>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> Email </label>
        <input
          type="text"
          value={emailAddresses}
          onChange={e => setEmailAddresses(e.target.value)}
          required
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> Phone Number </label>
        <input
          type="text"
          value={phoneNumbers}
          onChange={e => setPhoneNumbers(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> LinkedIn Url </label>
        <input
          type="url"
          value={linkedinUrl}
          onChange={e => setLinkedinUrl(e.target.value)}
          required
          placeholder=""
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> Subject </label>
        <input
          type="text"
          value={historyEntrySubject}
          onChange={e => setHistoryEntrySubject(e.target.value)}
          required
          placeholder=""
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> Message </label>
        <textarea
          value={historyEntryMessage}
          onChange={e => setHistoryEntryMessage(e.target.value)}
          required
          placeholder=""
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
          rows={4}
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> Location </label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder=""
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> HeadLine </label>
        <input
          type="text"
          value={headline}
          onChange={e => setHeadline(e.target.value)}
          placeholder=""
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> Current Company Name </label>
        <input
          type="text"
          value={currentCompanyName}
          onChange={e => setCurrentCompanyName(e.target.value)}
          placeholder=""
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> Current Position </label>
        <input
          type="text"
          value={currentPosition}
          onChange={e => setCurrentPosition(e.target.value)}
          placeholder=""
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-4 text-gray-900 dark:text-white"
        />

        <label className="block font-medium text-gray-700 dark:text-gray-200"> External Id </label>
        <input
          type="text"
          value={externalId}
          onChange={e => setExternalId(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 mb-6 text-gray-900 dark:text-white"
        />

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">CV (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={e => setCvFile(e.target.files?.[0] ?? null)}
            required
            className="w-full"
          />
          {cvFile && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              ✅ Fichier sélectionné : <strong>{cvFile.name}</strong>
            </p>
          )}
        </div>


        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Lettre de motivation (DOC/DOCX)</label>
          <input
            type="file"
            accept=".doc,.docx"
            onChange={e => setMotivationFile(e.target.files?.[0] ?? null)}
            className="w-full"
          />
          {motivationFile && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              ✅ Fichier sélectionné : <strong>{motivationFile.name}</strong>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full disabled:opacity-50"
        >
          {loading ? 'Sending..' : 'Submit'}
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">✅ success !</p>}
      </form>
    </div>
  )
}
