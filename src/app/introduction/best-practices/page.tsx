'use client'

import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] grid-rows-[1fr] items-center justify-items-center sm:p-8 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold pt-[20px]">Best Practices</h1>

      <h1 className="text-4xl font-bold">GitHub APIs</h1>

      <Tabs defaultValue="apps-do" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="apps-do">Do</TabsTrigger>
          <TabsTrigger value="apps-dont">Don&apos;t</TabsTrigger>
        </TabsList>
        <TabsContent value="apps-do">
          <Card>
            <CardHeader>
              <CardDescription>
                Use GitHub Apps for accessing organization-level APIs
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="apps-dont">
          <Card>
            <CardHeader>
              <CardDescription>Use personal access tokens</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>

      <h1 className="text-4xl font-bold">Sensitive information</h1>

      <Tabs defaultValue="info-do" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info-do">Do</TabsTrigger>
          <TabsTrigger value="info-dont">Don&apos;t</TabsTrigger>
        </TabsList>
        <TabsContent value="info-do">
          <Card>
            <CardHeader>
              <CardDescription>
                Use issue forms inputs that accept references to sensitive
                information in secure locations
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="info-dont">
          <Card>
            <CardHeader>
              <CardDescription>
                Accept sensitive information directly in issues
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>

      <h1 className="text-4xl font-bold">Validation</h1>

      <Tabs defaultValue="val-do" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="val-do">Do</TabsTrigger>
          <TabsTrigger value="val-dont">Don&apos;t</TabsTrigger>
        </TabsList>
        <TabsContent value="val-do">
          <Card>
            <CardHeader>
              <CardDescription>
                Validate issue and comment text at every step in the IssueOps
                workflow
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="val-dont">
          <Card>
            <CardHeader>
              <CardDescription>
                Rely on labels to determine if an issue has been validated or
                approved
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
