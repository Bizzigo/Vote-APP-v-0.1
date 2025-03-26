
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface JobVacancy {
  id: number;
  title: string;
  location: string;
  type: string;
}

interface JobsTabProps {
  jobVacancies: JobVacancy[];
}

const JobsTab: React.FC<JobsTabProps> = ({ jobVacancies }) => {
  return (
    <Card id="job-offers-section">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Job Offers ({jobVacancies.length})</h3>
        {jobVacancies.length > 0 ? (
          <div className="space-y-4">
            {jobVacancies.map(job => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.location} · {job.type}
                      </p>
                    </div>
                    <Badge className="rounded-sm">Apply</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No job openings available at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default JobsTab;
