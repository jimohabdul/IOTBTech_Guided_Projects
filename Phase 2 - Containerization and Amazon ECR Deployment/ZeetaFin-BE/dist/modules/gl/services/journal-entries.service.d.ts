import { Repository, DataSource } from 'typeorm';
import { JournalEntry, JournalEntryLine } from '../entities/journal-entry.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { CreateJournalEntryDto } from '../dto/journal-entry.dto';
export declare class JournalEntriesService {
    private journalRepository;
    private lineRepository;
    private accountRepository;
    private dataSource;
    constructor(journalRepository: Repository<JournalEntry>, lineRepository: Repository<JournalEntryLine>, accountRepository: Repository<ChartOfAccount>, dataSource: DataSource);
    findAll(status?: string): Promise<JournalEntry[]>;
    findOne(id: string): Promise<JournalEntry>;
    create(dto: CreateJournalEntryDto, userId: string): Promise<JournalEntry>;
    approve(id: string, userId: string): Promise<JournalEntry>;
    post(id: string): Promise<JournalEntry>;
}
